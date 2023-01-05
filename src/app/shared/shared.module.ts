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
import {UserAuthenticationCheckService} from "./services/user-authentication-check.service";


@NgModule({
  declarations: [
    HeaderComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
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

  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
    FooterComponent,


  ],
  providers: [UserAuthenticationCheckService]

})
export class SharedModule { }
