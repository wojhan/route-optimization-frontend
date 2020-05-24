import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebSocketSubject } from 'rxjs/webSocket';
import { finalize } from 'rxjs/operators';

import { BusinessTripMessageType } from '@route-optimizer/core/enums/BusinessTripMessageType';
import { BusinessTrip } from '@route-optimizer/core/models/BusinessTrip';
import { BusinessTripWSInfo } from '@route-optimizer/core/models/BusinessTripWSInfo';
import { FetchableContentList } from '@route-optimizer/core/models/FetchableContentList';
import { BusinessTripFormData } from '@route-optimizer/core/models/forms/BusinessTripFormData';
import { Requisition } from '@route-optimizer/core/models/Requisition';
import { BusinessTripService } from '@route-optimizer/core/services/business-trip.service';
import { RequisitionService } from '@route-optimizer/core/services/requisition.service';
import { SpinnerOverlayService } from '@route-optimizer/core/services/spinner-overlay.service';
import { environment } from '@route-optimizer/environment/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-business-trip-edit',
  templateUrl: './business-trip-edit.page.html'
})
export class BusinessTripEditPage implements OnInit {
  businessTripWsSubject: WebSocketSubject<any>;
  businessTrip: BusinessTrip;
  businessTripInfo: BusinessTripWSInfo;
  businessTripForm: FormGroup;
  requisitionsControl: FormArray;
  departmentControl: FormControl;
  departmentAutocompleteUrl = `${environment.apiUrl}api/departments/`;
  errors: string[];

  requisitions: FetchableContentList<Requisition>;

  // subscriptions
  private requisitionsSubscription: Subscription;

  constructor(
    private businessTripService: BusinessTripService,
    private requisitionService: RequisitionService,
    private toastr: ToastrService,
    private spinner: SpinnerOverlayService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.data.businessTrip.id;
    this.departmentControl = new FormControl(null, [Validators.required]);
    this.businessTripWsSubject = this.businessTripService.getBusinessTripWS(id);
    this.businessTripInfo = { state: undefined };
    this.businessTripWsSubject.asObservable().subscribe({
      next: msg => {
        this.businessTripInfo = { state: msg.messageType };
        switch (msg.messageType) {
          case BusinessTripMessageType.SUCCEEDED:
            this.updateBusinessTripInfo(msg.message);
            break;
          case BusinessTripMessageType.PROCESSING:
            if (msg.message && msg.message.value) {
              this.businessTripInfo.progress = msg.message.value;
            }
            if (msg.message && msg.message.timeLeft) {
              this.businessTripInfo.timeLeft = msg.message.timeLeft;
            }
            break;
        }
      },
      error: () => {
        this.toastr.error('Wystąpił błąd podczas przetwarzania informacji o delegacji z serwera.');
      }
    });

    this.requisitionsControl = new FormArray([]);
    this.requisitions = { data: [], loading: false };
    this.businessTripForm = new FormGroup({
      assignee: new FormControl(null),
      department: this.departmentControl,
      startDate: new FormControl(null, [Validators.required]),
      finishDate: new FormControl(null, [Validators.required]),
      maxDistance: new FormControl(null, [Validators.required]),
      requisitions: this.requisitionsControl
    });
    this.updateBusinessTripInfo(this.route.snapshot.data.businessTrip);
  }

  updateRequisitions() {
    if (this.requisitionsSubscription) {
      this.requisitionsSubscription.unsubscribe();
    }
    this.requisitionsControl.clear();
    this.requisitions.data = [];

    this.businessTrip.requisitions.forEach(requisition => {
      this.requisitions.data.push(requisition);
      this.requisitionsControl.push(new FormControl(requisition));
    });

    this.requisitionsSubscription = this.requisitionService
      .getRequisitions(this.businessTrip.assignee.id)
      .pipe(finalize(() => (this.requisitions.loading = false)))
      .subscribe({
        next: (requisition: Requisition) => {
          this.requisitions.data.push(requisition);
        }
      });
  }

  updateBusinessTripInfo(businessTrip: BusinessTrip) {
    this.businessTrip = businessTrip;
    this.requisitions.loading = true;
    this.requisitions.data = [];
    this.updateRequisitions();

    const controls = Object.keys(this.businessTripForm.controls);
    controls.forEach(control => {
      if (control !== 'requisitions') {
        this.businessTripForm.get(control).setValue(businessTrip[control]);
      }
    });
  }

  updateBusinessTrip(): void {
    const updateData: BusinessTripFormData = {};
    const updateFields = ['startDate', 'finishDate', 'maxDistance', 'department'];

    updateFields.forEach(fieldName => {
      const formValue = this.businessTripForm.get(fieldName).value;
      const businessTripValue = this.businessTrip[fieldName];

      if (formValue !== businessTripValue) {
        updateData[fieldName] = formValue;
      }
    });

    const sortedFormRequisitions = this.businessTripForm.get('requisitions').value.sort((a, b) => a.id - b.id);
    const sortedBusinessTripRequisitions = this.businessTrip.requisitions.sort((a, b) => a.id - b.id);

    if (JSON.stringify(sortedFormRequisitions) !== JSON.stringify(sortedBusinessTripRequisitions)) {
      updateData.requisitions = this.businessTripForm.get('requisitions').value;
    }

    if (Object.keys(updateData).length > 0) {
      this.businessTripService.partialUpdateBusinessTrip(this.businessTrip.id, updateData).subscribe({
        next: (businessTrip: BusinessTrip) => {
          this.toastr.success('Zapisano zmiany');
          this.router.navigate(['/business-trips', businessTrip.id]);
        }
      });
    }
  }
}
