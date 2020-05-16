import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsPage } from './company-details.page';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsPage;
  let fixture: ComponentFixture<CompanyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDetailsPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
