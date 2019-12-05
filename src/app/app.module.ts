import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService, LocalStorage } from './services/utils';

const APPLICATION_MODULES = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule
]

const UTILITY_SERVICES = [
  HttpService,
  LocalStorage
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...APPLICATION_MODULES
  ],
  providers: [
    ...UTILITY_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
