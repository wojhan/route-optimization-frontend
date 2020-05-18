import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IconDefinition, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { debounceTime, delay, filter, share, startWith, switchMap, tap } from 'rxjs/operators';

import { FetchableContentList } from '@route-optimizer/core/models/FetchableContentList';
import { Page } from '@route-optimizer/core/models/Page';
import { Requisition } from '@route-optimizer/core/models/Requisition';
import { RequisitionService } from '@route-optimizer/core/services/requisition.service';
import { environment } from '@route-optimizer/environment/environment';
import { RequisitionEditModal } from '@route-optimizer/modules/user-dashboard/modules/requisitions/modals/requisition-edit/requisition-edit.modal';
import { AuthenticationService } from '@route-optimizer/core/services/authentication.service';
import { ConfirmRemoveModal } from '@route-optimizer/shared/components/confirm-remove-modal/confirm-remove.modal';

@Component({
  selector: 'app-requisitions-list',
  templateUrl: './requisitions-list.page.html'
})
export class RequisitionsListPage implements OnInit, OnDestroy {
  faEllipsisV: IconDefinition = faEllipsisV;
  filterForm: FormGroup;
  page: Observable<Page<Requisition>>;
  pageUrl: BehaviorSubject<string>;
  requisitionsPageUrl: string = environment.apiUrl + `api/requisitions/?format=json&page_size=${environment.defaultPaginationSize}`;
  requisitions: FetchableContentList<Requisition> = { data: null, loading: true };

  userId: number;

  constructor(
    private requisitionService: RequisitionService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = this.authenticationService.currentUser.getValue().id;
    this.filterForm = new FormGroup({
      search: new FormControl()
    });

    this.pageUrl = new BehaviorSubject<string>(this.requisitionsPageUrl + '&page=1');

    this.page = this.getRequisitionPage();
    this.page.subscribe((page: Page<Requisition>) => this.updatePage(page));
  }

  ngOnDestroy() {}

  private getRequisitionPage(): Observable<Page<Requisition>> {
    return merge(this.filterForm.valueChanges.pipe(debounceTime(200), startWith(this.filterForm.value)), this.pageUrl).pipe(
      tap(() => (this.requisitions.loading = true)),
      delay(200),
      switchMap(urlOrFilter => this.requisitionService.list(urlOrFilter)),
      share(),
      untilComponentDestroyed(this)
    );
  }

  private updatePage(page: Page<Requisition>) {
    this.requisitions.data = page.results;
    this.requisitions.loading = false;
  }

  addRequisition(): void {
    const form: FormGroup = new FormGroup({
      company: new FormControl(null, [Validators.required]),
      estimatedProfit: new FormControl(null, [Validators.required])
    });

    const dialog = this.dialog.open(RequisitionEditModal, {
      width: '400px',
      data: {
        form,
        title: 'Nowa oferta'
      }
    });

    dialog
      .afterClosed()
      .pipe(filter(v => !!v))
      .subscribe({
        next: () => {
          this.toastr.success('Dodano nową ofertę');
          this.onPageChanged(this.pageUrl.getValue());
        }
      });
  }

  canEdit(requisition: Requisition) {
    return this.requisitionService.canEditRequisition(requisition);
  }

  deleteRequisition(id: number): void {
    const dialog = this.dialog.open(ConfirmRemoveModal, {
      width: '450px',
      data: {
        content: 'Czy na pewno chcesz usunąć ofertę?',
        ok: true
      }
    });

    dialog
      .afterClosed()
      .pipe(
        filter(v => !!v),
        switchMap(() => this.requisitionService.deleteRequisition(id))
      )
      .subscribe({
        next: () => {
          this.toastr.success('Usunięto ofertę');
          this.onPageChanged(this.pageUrl.getValue());
        }
      });
  }

  onPageChanged(page: string) {
    this.pageUrl.next(page);
  }
}
