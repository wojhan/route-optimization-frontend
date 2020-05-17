import { Component, HostBinding, OnInit } from '@angular/core';
import { faAngleDoubleLeft, faAngleDoubleRight, IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';

import { MapMarker } from '@route-optimizer/modules/map/components/map-marker/map-marker';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html'
})
export class DepartmentPage implements OnInit {
  @HostBinding('class') classes = 'fluid-content-wrapper';

  faTrash: IconDefinition = faTrash;

  isMapPanelEnabled = true;
  mapPanelIconClass = {
    'map-panel-icon': true,
    'map-shadow': !this.isMapPanelEnabled
  };
  mapPanelIcon: IconDefinition = faAngleDoubleLeft;
  companyMarker: MapMarker = MapMarker.COMPANY;
  mapCoordinates: L.LatLng[];

  fitToSubject: BehaviorSubject<L.LatLng> = new BehaviorSubject<L.LatLng>(null);

  constructor() {}

  ngOnInit() {
    this.mapCoordinates = [];
  }

  toggleMapPanel() {
    this.isMapPanelEnabled = !this.isMapPanelEnabled;
    this.mapPanelIconClass['map-shadow'] = !this.isMapPanelEnabled;

    this.mapPanelIcon = this.isMapPanelEnabled ? faAngleDoubleLeft : faAngleDoubleRight;
  }

  fitTo(department) {
    this.fitToSubject.next(this.mapCoordinates[department - 1]);
  }
}
