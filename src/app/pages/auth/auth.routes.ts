import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NonAuthGuardService } from 'src/app/services/route-guards';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [NonAuthGuardService],
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);