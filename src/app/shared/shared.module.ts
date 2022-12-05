import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../components/header/header.component";
import {FooterComponent} from "../components/footer/footer.component";
import {MaterialModule} from "./material/material.module";
import {AuthorizationComponent} from "../components/authorization/authorization.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimengModule} from "./primeng/primeng.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AuthorizationDialogComponent} from "../components/authorization-dialog/authorization-dialog.component";
import {RegistrationDialogComponent} from "../components/registration-dialog/registration-dialog.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
//import {CurrencyUaPipe} from "./pipes/currency-ua.pipe";



@NgModule({
  declarations: [
    HeaderComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
   // CurrencyUaPipe,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    HttpClientModule,
   // CurrencyUaPipe,
    AppRoutingModule,
    HeaderComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
    FooterComponent
  ]

})
export class SharedModule { }
