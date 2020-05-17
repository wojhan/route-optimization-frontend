import { FormGroup } from '@angular/forms';

export interface AddDepartmentDialogData {
  title: string;
  form: FormGroup;
  errors: string[];
}
