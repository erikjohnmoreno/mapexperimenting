import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './main.routes';

import { MainComponent } from './main.component';
import { HeaderComponent, FooterComponent } from './partials';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './map/course/course.component';

const COMPONENTS = [
  MainComponent,
  MapComponent,
  HomeComponent,
  CourseComponent
]

const PARTIAL_COMPONENTS = [
  HeaderComponent, FooterComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    ...COMPONENTS,
    ...PARTIAL_COMPONENTS
  ]
})

export class MainModule {}