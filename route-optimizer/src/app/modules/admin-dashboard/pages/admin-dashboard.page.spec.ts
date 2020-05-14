import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardPage } from './admin-dashboard.page';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardPage;
  let fixture: ComponentFixture<AdminDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
