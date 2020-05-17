import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Department } from '@route-optimizer/core/models/Department';
import { DepartmentService } from '@route-optimizer/core/services/department.service';
import { AddDepartmentDialogData } from '@route-optimizer/modules/admin-dashboard/modules/department/modals/add-department/AddDepartmentDialogData';
import { InvalidAddressQueryError } from '@route-optimizer/modules/map/InvalidAddressQueryError';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.modal.html'
})
export class AddDepartmentModal {
  constructor(
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<AddDepartmentModal>,
    @Inject(MAT_DIALOG_DATA) public data: AddDepartmentDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const department: Department = this.data.form.value;
    this.departmentService.createDepartment(department).subscribe({
      next: () => this.dialogRef.close(department),
      error: err => {
        if (err instanceof InvalidAddressQueryError) {
          this.data.errors = ['Dla podanego adresu nie udało się uzyskać współrzędnych geograficznych'];
        }
      }
    });
  }
}
