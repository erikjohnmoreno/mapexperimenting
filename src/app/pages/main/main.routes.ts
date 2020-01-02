import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MainComponent } from './main.component';
import { AuthGuardService } from 'src/app/services/route-guards';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'map',
        component: MapComponent
      }
    ] 
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);