import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, finalize, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { BusinessTrip } from '@route-optimizer/core/models/BusinessTrip';
import { FetchableContentList } from '@route-optimizer/core/models/FetchableContentList';
import { Requisition } from '@route-optimizer/core/models/Requisition';
import { User } from '@route-optimizer/core/models/User';
import { BusinessTripService } from '@route-optimizer/core/services/business-trip.service';
import { RequisitionService } from '@route-optimizer/core/services/requisition.service';
import { environment } from '@route-optimizer/environment/environment';

@Component({
  selector: 'app-business-trip-add',
  templateUrl: './business-trip-add.page.html'
})
export class BusinessTripAddPage implements OnInit {
  autocompleteUrl = `${environment.apiUrl}api/employees/`;
  autocompleteDepartmentUrl = `${environment.apiUrl}api/departments/`;
  businessTripForm: FormGroup;
  assigneeControl: FormControl;
  departmentControl: FormControl;
  requisitionsControl: FormArray;
  errors: string[];

  requisitions: FetchableContentList<Requisition>;

  constructor(
    private requisitionService: RequisitionService,
    private businessTripService: BusinessTripService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.assigneeControl = new FormControl(null, [Validators.required]);
    this.departmentControl = new FormControl(null, [Validators.required]);
    this.requisitionsControl = new FormArray([]);
    this.businessTripForm = new FormGroup({
      assignee: this.assigneeControl,
      department: this.departmentControl,
      startDate: new FormControl(null, [Validators.required]),
      finishDate: new FormControl(null, [Validators.required]),
      maxDistance: new FormControl(null, [Validators.required]),
      requisitions: this.requisitionsControl
    });

    this.requisitions = { data: null, loading: undefined };

    this.assigneeControl.valueChanges
      .pipe(
        filter(value => value instanceof Object && value.id),
        switchMap((user: User) => {
          this.requisitions.data = [];
          this.requisitions.loading = true;
          return this.requisitionService.getRequisitions(user.id).pipe(
            finalize(() => {
              this.requisitions.loading = false;
            })
          );
        })
      )
      .subscribe({
        next: value => {
          this.requisitions.data.push(value);
        }
      });
  }

  addBusinessTrip(): void {
    const businessTrip: BusinessTrip = this.businessTripForm.value;

    this.assigneeControl.setErrors(null);
    this.departmentControl.setErrors(null);
    this.errors = [];

    if (!(businessTrip.assignee instanceof Object)) {
      this.assigneeControl.setErrors({ invalid: true });
      return;
    }

    if (!(businessTrip.department instanceof Object)) {
      this.departmentControl.setErrors({ invalid: true });
    }

    businessTrip.assignee = this.assigneeControl.value.id;
    businessTrip.department = this.departmentControl.value.id;
    businessTrip.requistions = this.businessTripForm.get('requisitions').value;

    if (businessTrip.requistions.length === 0) {
      this.errors.push('Musisz zaznaczyć przynajmniej jedną ofertę');
      return;
    }

    this.businessTripService.createBusinessTrip(businessTrip).subscribe({
      next: (newBusinessTrip: BusinessTrip) => {
        this.toastr.success('Dodano nową delegację');
        this.router.navigate(['/business-trips', newBusinessTrip.id]);
      },
      error: () => {
        this.toastr.error('Podczas tworzenia delegacji wystąpił błąd, proszę spróbować jeszcze raz');
      }
    });
  }
}
