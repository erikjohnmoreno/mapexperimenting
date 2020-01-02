import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService, LocalStorage } from './services/utils';
import { MapboxService, UserService, SessionService, CourseService } from './services/api';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { AuthGuardService, NonAuthGuardService } from './services/route-guards';

const APPLICATION_MODULES = [
  BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
]

const APPLICATION_SERVICES = [
  MapboxService, UserService, SessionService, CourseService
]

const UTILITY_SERVICES = [
  HttpService, LocalStorage
]

const ROUTE_GUARD_SERVICES = [
  AuthGuardService,
  NonAuthGuardService
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...APPLICATION_MODULES,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    ...UTILITY_SERVICES,
    ...APPLICATION_SERVICES,
    ...ROUTE_GUARD_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
