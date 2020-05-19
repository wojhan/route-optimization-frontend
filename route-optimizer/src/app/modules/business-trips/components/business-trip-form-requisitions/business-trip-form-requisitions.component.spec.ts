import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripFormRequisitionsComponent } from './business-trip-form-requisitions.component';

describe('BusinessTripFormRequisitionsComponent', () => {
  let component: BusinessTripFormRequisitionsComponent;
  let fixture: ComponentFixture<BusinessTripFormRequisitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessTripFormRequisitionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripFormRequisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
