import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './main.routes';

import { MainComponent } from './main.component';

const COMPONENTS = [
  MainComponent
]

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ...COMPONENTS
  ]
})

export class MainModule {}