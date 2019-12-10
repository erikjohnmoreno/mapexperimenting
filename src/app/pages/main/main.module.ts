import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './main.routes';

import { MainComponent } from './main.component';
import { HeaderComponent, FooterComponent } from './partials';
import { MapComponent } from './map/map.component';

const COMPONENTS = [
  MainComponent,
  MapComponent
]

const PARTIAL_COMPONENTS = [
  HeaderComponent, FooterComponent
]

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ...COMPONENTS,
    ...PARTIAL_COMPONENTS
  ]
})

export class MainModule {}