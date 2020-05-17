import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Map, Marker, MapOptions, LatLng, featureGroup } from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MapService } from '@route-optimizer/core/services/map.service';
import { environment } from '@route-optimizer/environment/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  private map: Map;
  private markers: Marker[] = [];

  @Input() width: number;
  @Input() height: number;
  @Input() mapId: string;
  @Input() mapOptions: MapOptions = environment.map.defaultMapOptions as L.MapOptions;
  @Input() lat: number = environment.map.defaultLat;
  @Input() lng: number = environment.map.defaultLng;
  @Input() markerCoordinates = [];
  @Input() fitTo: BehaviorSubject<LatLng>;
  @Input() fitToMeters = 10000;

  constructor(private mapService: MapService, private toastr: ToastrService) {}

  ngOnInit() {
    if (this.fitTo) {
      this.fitTo
        .pipe(
          filter(v => !!v),
          untilComponentDestroyed(this)
        )
        .subscribe({
          next: (latLng: LatLng) => {
            const bounds = latLng.toBounds(this.fitToMeters);
            this.map.fitBounds(bounds);
          }
        });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.map) {
      return;
    }
    if (changes.markerCoordinates && changes.markerCoordinates.currentValue) {
      if (changes.markerCoordinates.isFirstChange()) {
        this.markers = [];
      } else {
        this.updateMarkers();
      }
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    if (this.mapOptions) {
      this.map = this.mapService.initMap(this.mapOptions, this.mapId);
      this.updateMarkers();
    } else {
      this.toastr.error('Wystąpił błąd podczas ładowania mapy.');
    }
  }

  private updateMarkers(): void {
    if (this.markers && this.markers.length) {
      this.markers.forEach(marker => {
        marker.removeFrom(this.map);
      });
      this.markers = [];
    }

    this.markerCoordinates.forEach(latLng => {
      const marker = this.mapService.initMarker(latLng);
      marker.addTo(this.map);
      this.markers.push(marker);
    });

    if (this.markers && this.markers.length) {
      const group = featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.5));
      this.map.setZoom(this.markers.length === 1 ? environment.map.singleElementZoom : this.mapOptions.zoom);
    }
  }
}
