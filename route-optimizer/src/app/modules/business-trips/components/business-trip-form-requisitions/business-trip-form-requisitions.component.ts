import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchableContentList } from '@route-optimizer/core/models/FetchableContentList';
import { Requisition } from '@route-optimizer/core/models/Requisition';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-business-trip-form-requisitions',
  templateUrl: './business-trip-form-requisitions.component.html'
})
export class BusinessTripFormRequisitionsComponent implements OnInit {
  @Input() requisitions: FetchableContentList<Requisition>;
  @Input() requisitionsFormControl: FormArray;

  filterForm: FormGroup;
  filterControl: FormControl;
  filteredRequisitions: FetchableContentList<Requisition>;
  requsitionLoaded: FetchableContentList<Requisition>;

  constructor() {}

  ngOnInit() {
    this.filteredRequisitions = { data: null, loading: false };
    this.filterControl = new FormControl();
    this.filterForm = new FormGroup({
      filter: this.filterControl
    });
    this.requsitionLoaded = this.requisitions;
    this.filterControl.valueChanges
      .pipe(
        debounceTime(200),
        map((value: string) => {
          // Only when requisitions are fully loaded
          console.log('d');
          this.requsitionLoaded = this.filteredRequisitions;
          if (this.requisitions.loading === false) {
            this.filteredRequisitions.data = this.requisitions.data.filter((requisition: Requisition) => {
              const { name, nip, street, city } = requisition.company;
              return name.includes(value) || nip.toString().includes(value) || street.includes(value) || city.includes(value);
            });
            console.log(this.filteredRequisitions);
            return of(value);
          }

          return EMPTY;
        })
      )
      .subscribe();
  }

  onAllCheckChange(event) {
    const formArray: FormArray = this.requisitionsFormControl;

    this.requisitionsFormControl.clear();

    if (event.source.checked) {
      this.requisitions.data.forEach(requisition => {
        this.requisitionsFormControl.push(new FormControl(requisition));
      });
    }
  }

  isRequistionChecked(requistion) {
    if (this.requisitionsFormControl.controls.length > 0) {
      return this.requisitionsFormControl.controls.find(element => JSON.stringify(element.value) === JSON.stringify(requistion));
    } else {
      return false;
    }
  }

  onCheckChange(event) {
    /* Selected */
    if (event.source.checked) {
      // Add a new control in the arrayForm
      this.requisitionsFormControl.push(new FormControl(event.source.value));
    } else {
      /* unselected */
      // find the unselected element
      let i = 0;

      this.requisitionsFormControl.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.source.value) {
          // Remove the unselected element from the arrayForm
          this.requisitionsFormControl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
