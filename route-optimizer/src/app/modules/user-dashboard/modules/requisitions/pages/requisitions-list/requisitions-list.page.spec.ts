import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsListPage } from './requisitions-list.page';

describe('RequisitionsListComponent', () => {
  let component: RequisitionsListPage;
  let fixture: ComponentFixture<RequisitionsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequisitionsListPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
