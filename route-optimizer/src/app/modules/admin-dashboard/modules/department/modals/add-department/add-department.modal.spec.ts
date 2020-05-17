import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentModal } from './add-department.modal';

describe('AddDepartmentComponent', () => {
  let component: AddDepartmentModal;
  let fixture: ComponentFixture<AddDepartmentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepartmentModal]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
