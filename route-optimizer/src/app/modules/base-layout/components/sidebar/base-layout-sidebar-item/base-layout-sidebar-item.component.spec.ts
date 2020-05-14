import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutSidebarItemComponent } from './base-layout-sidebar-item.component';

describe('BaseLayoutSidebarItemComponent', () => {
  let component: BaseLayoutSidebarItemComponent;
  let fixture: ComponentFixture<BaseLayoutSidebarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLayoutSidebarItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
