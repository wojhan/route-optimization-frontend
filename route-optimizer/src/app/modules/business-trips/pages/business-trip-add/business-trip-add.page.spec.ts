import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripAddPage } from './business-trip-add.page';

describe('BusinessTripAddComponent', () => {
  let component: BusinessTripAddPage;
  let fixture: ComponentFixture<BusinessTripAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessTripAddPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
