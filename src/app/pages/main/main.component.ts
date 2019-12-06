import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MapboxService } from '../../services/api';

import * as mapboxgl from 'mapbox-gl';

import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.pug',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: any;
  lng: any;

  direction: any;

  constructor(
    private mapboxService: MapboxService
  ) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 15,
          center: [this.lng, this.lat]
        })
        this.direction = new MapboxDirections({
          accessToken: environment.mapbox.accessToken,
          unit: 'metric',
          profile: 'mapbox/cycling'
        })

        this.map.addControl(this.direction, 'top-left');

        this.direction.setOrigin([this.lng, this.lat]);

        this.map.on('click', (event) => {
          this.direction.setDestination([event.lngLat.lng, event.lngLat.lat]);
        })

        this.initCurrentLocationMarker();
      })
    } 
  }

  initCurrentLocationMarker() {
    new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
  }

}