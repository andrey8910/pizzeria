import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimengModule} from "./primeng/primeng.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AuthorizationDialogComponent} from "../authorization-dialog/authorization-dialog.component";
import {RegistrationDialogComponent} from "../registration-dialog/registration-dialog.component";
import {UserAuthenticationCheckService} from "../core/services/user-authentication-check.service";
import {CurrencyUaPipe} from "../core/pipes/currency-ua.pipe";


@NgModule({
  declarations: [
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
    CurrencyUaPipe

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,



  ],
  providers: [UserAuthenticationCheckService]

})
export class SharedModule { }
