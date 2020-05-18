import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Requisition } from '@route-optimizer/core/models/Requisition';
import { RequisitionService } from '@route-optimizer/core/services/requisition.service';
import { environment } from '@route-optimizer/environment/environment';
import { AuthenticationService } from '@route-optimizer/core/services/authentication.service';

@Component({
  selector: 'app-requisition-edit',
  templateUrl: './requisition-edit.modal.html'
})
export class RequisitionEditModal implements OnInit {
  autocompleteUrl = `${environment.apiUrl}api/companies/`;
  autocompleteControl: FormControl;

  errors: string[] = [];

  constructor(
    private requisitionService: RequisitionService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<RequisitionEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: { form: FormGroup; title: string }
  ) {}

  ngOnInit() {
    this.autocompleteControl = this.data.form.get('company') as FormControl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.autocompleteControl.setErrors(null);
    if (!(this.autocompleteControl.value instanceof Object) || !this.autocompleteControl.value.id) {
      this.autocompleteControl.setErrors({ invalid: true });
      return;
    }

    if (this.data.form.valid) {
      const requisition: Requisition = this.data.form.value;
      requisition.createdBy = this.authenticationService.currentUser.getValue().id;

      this.requisitionService.addRequisition(requisition).subscribe({
        next: () => {
          this.dialogRef.close(requisition);
        },
        error: err => {
          this.errors = ['Wystąpił błąd podczas dodawania oferty'];
        }
      });
    }
  }
}
