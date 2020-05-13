import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMarkerComponent } from './map-marker.component';

describe('MapMarkerComponent', () => {
  let component: MapMarkerComponent;
  let fixture: ComponentFixture<MapMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapMarkerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
