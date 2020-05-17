import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInfiniteScrollComponent } from './autocomplete-infinite-scroll.component';

describe('AutocompleteInfiniteScrollComponent', () => {
  let component: AutocompleteInfiniteScrollComponent;
  let fixture: ComponentFixture<AutocompleteInfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteInfiniteScrollComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
