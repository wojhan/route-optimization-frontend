import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentPage } from './department.page';

describe('DepartmentComponent', () => {
  let component: DepartmentPage;
  let fixture: ComponentFixture<DepartmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
