import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutAdminSidebarComponent } from './base-layout-admin-sidebar.component';

describe('BaseLayoutAdminSidebarComponent', () => {
  let component: BaseLayoutAdminSidebarComponent;
  let fixture: ComponentFixture<BaseLayoutAdminSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLayoutAdminSidebarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
