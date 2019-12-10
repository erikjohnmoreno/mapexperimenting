import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './auth.routes';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const COMPONENTS = [
  AuthComponent
]

const CHILD_COMPONENTS = [
  LoginComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    routing
  ],
  declarations: [
    ...COMPONENTS,
    ...CHILD_COMPONENTS
  ]
})

export class AuthModule {}