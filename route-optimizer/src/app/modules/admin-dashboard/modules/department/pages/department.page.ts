import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faAngleDoubleLeft, faAngleDoubleRight, IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, finalize, switchMap } from 'rxjs/operators';
import * as L from 'leaflet';

import { DepartmentService } from '@route-optimizer/core/services/department.service';
import { SpinnerOverlayService } from '@route-optimizer/core/services/spinner-overlay.service';
import { Department } from '@route-optimizer/core/models/Department';
import { MapMarker } from '@route-optimizer/modules/map/components/map-marker/map-marker';
import { ConfirmRemoveModal } from '@route-optimizer/shared/components/confirm-remove-modal/confirm-remove.modal';
import { AddDepartmentModal } from '../modals/add-department/add-department.modal';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html'
})
export class DepartmentPage implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'fluid-content-wrapper';

  faTrash: IconDefinition = faTrash;

  isMapPanelEnabled = true;
  mapPanelIconClass = {
    'map-panel-icon': true,
    'map-shadow': !this.isMapPanelEnabled
  };
  mapPanelIcon: IconDefinition = faAngleDoubleLeft;
  companyMarker: MapMarker = MapMarker.COMPANY;
  mapCoordinates: L.LatLng[];
  tmpMapCoordinates: L.LatLng[];

  departments: Department[] = [];
  departmentSubscription: Subscription;
  fitToSubject: BehaviorSubject<L.LatLng> = new BehaviorSubject<L.LatLng>(null);

  constructor(
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private spinner: SpinnerOverlayService
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  ngOnDestroy() {
    if (this.departmentSubscription) {
      this.departmentSubscription.unsubscribe();
    }
  }

  getDepartments() {
    this.spinner.show();
    if (this.departmentSubscription) {
      this.departmentSubscription.unsubscribe();
    }
    this.departments = [];
    this.tmpMapCoordinates = [];
    this.departmentSubscription = this.departmentService
      .getAllDepartments()
      .pipe(
        finalize(() => {
          this.mapCoordinates = this.tmpMapCoordinates;
          this.spinner.hide();
        })
      )
      .subscribe(department => {
        this.tmpMapCoordinates.push(L.latLng(department.latitude, department.longitude));
        this.departments.push(department);
      });
  }

  toggleMapPanel() {
    this.isMapPanelEnabled = !this.isMapPanelEnabled;
    this.mapPanelIconClass['map-shadow'] = !this.isMapPanelEnabled;

    this.mapPanelIcon = this.isMapPanelEnabled ? faAngleDoubleLeft : faAngleDoubleRight;
  }

  fitTo(department: Department) {
    this.fitToSubject.next(L.latLng(department.latitude, department.longitude));
  }

  deleteDepartment(id: number) {
    const dialog = this.dialog.open(ConfirmRemoveModal, {
      width: '350px',
      data: {
        content: `Czy na pewno chcesz usunąć wybraną filię?
         Usunięcie jej spowoduje również usunięcie wszystkich delegacji powiązanych z tą filią.`,
        ok: true
      }
    });

    dialog
      .afterClosed()
      .pipe(
        filter(v => !!v),
        switchMap(() => this.departmentService.deleteDepartment(id))
      )
      .subscribe({
        next: () => {
          this.getDepartments();
          this.toastr.success('Usunięto filie firmy');
        }
      });
  }

  addDepartment() {
    const departmentFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      nip: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      street: new FormControl(null),
      houseNo: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{3}$/)]),
      city: new FormControl(null, [Validators.required])
    });
    const dialog = this.dialog.open(AddDepartmentModal, {
      width: '600px',
      data: {
        title: 'Dodaj nową filię',
        form: departmentFormGroup
      }
    });

    dialog
      .afterClosed()
      .pipe(filter(v => !!v))
      .subscribe({
        next: (department: Department) => {
          this.getDepartments();
          this.toastr.success('Dodano nową filię');
        }
      });
  }
}
