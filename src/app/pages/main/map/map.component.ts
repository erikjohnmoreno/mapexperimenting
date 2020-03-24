import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { CourseService } from 'src/app/services/api/course.service';
import { CourseComponent } from './course/course.component';

import * as mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'main-map',
  templateUrl: './map.component.pug',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(CourseComponent, {static: false})
  private courseComponent: CourseComponent;
  form: FormGroup;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  origin_lat: any;
  origin_lng: any;
  destination_lat: any;
  destination_lng: any;
  direction: any;
  origin_marker: any;
  destination_marker: any;

  watchPositionId: any; // id for geolocation watchposition

  showOptions: boolean = false;
  enableOptions: boolean = false;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.initializeCurrentLocation();
  }

  initializeCurrentLocation() {
    this.enableOptions = false;
    this.destination_marker = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
        this.origin_lat = position.coords.latitude;
        this.origin_lng = position.coords.longitude;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 15,
          center: [this.origin_lng, this.origin_lat]
        })
        this.direction = new MapboxDirections({
          accessToken: environment.mapbox.accessToken,
          unit: 'metric',
          profile: 'mapbox/cycling',
          controls: {
            inputs: false,
            instructions: false
          }
        })

        this.map.addControl(this.direction, 'top-left');
        
        this.direction.setOrigin([this.origin_lng, this.origin_lat]);

        this.map.on('click', (event) => {
          this.direction.setDestination([event.lngLat.lng, event.lngLat.lat]);
          this.destination_marker = new mapboxgl.Marker().setLngLat([event.lngLat.lng, event.lngLat.lat]).addTo(this.map);
          this.enableOptions = true;
          this.destination_lat = event.lngLat.lat;
          this.destination_lng = event.lngLat.lng;
        })

        this.initCurrentLocationMarker();
      })
    }
  }

  ngAfterViewInit() {
    this.showOptions = true;
  }

  initCurrentLocationMarker() {
    this.origin_marker = new mapboxgl.Marker().setLngLat([this.origin_lng, this.origin_lat]).addTo(this.map);
  }

  startTracking() {
    this.watchPositionId = navigator.geolocation.watchPosition((position) => {
      this.direction.setOrigin([position.coords.longitude, position.coords.latitude]);
      alert('location updated');
    })
  }

  endTracking() {
    navigator.geolocation.clearWatch(this.watchPositionId);
  }

  loadCourse(course) {
    if (this.origin_marker) {
      this.origin_marker.remove();
    }

    if (this.destination_marker) {
      this.destination_marker.remove();
    }
    // this.direction.setOrigin([course.start_lng, course.start_lat]);
    this.direction.setOrigin([this.origin_lng, this.origin_lat]);
    this.direction.setDestination([course.end_lng, course.end_lat]);
    this.origin_marker = new mapboxgl.Marker().setLngLat([course.start_lng, course.start_lat]).addTo(this.map);
    this.destination_marker = new mapboxgl.Marker().setLngLat([course.end_lng, course.end_lat]).addTo(this.map);
  }

  saveCourse() {
    var payload = {
      start_lat: this.origin_lat,
      start_lng: this.origin_lng,
      end_lat: this.destination_lat,
      end_lng: this.destination_lng,
      name: this.form.get('name').value
    }
    this.courseService.create(payload)
      .subscribe(
        res => {
          alert(res);
          this.courseComponent.loadCourses();
        }
      )
  }
  
}