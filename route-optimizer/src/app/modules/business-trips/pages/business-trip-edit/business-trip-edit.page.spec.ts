import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripEditPage } from './business-trip-edit.page';

describe('BusinessTripEditComponent', () => {
  let component: BusinessTripEditPage;
  let fixture: ComponentFixture<BusinessTripEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessTripEditPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
