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
//import {AdministrationComponent} from "../components/administration/administration.component";
//import {PizzasBannerComponent} from "../components/pizzas-all/pizzas-banner/pizzas-banner.component";
//import {AdminProductsComponent} from "../components/administration/admin-products/admin-products.component";
//import {AdminUsersComponent} from "../components/administration/admin-users/admin-users.component";
import {RegistrationDialogComponent} from "../components/registration-dialog/registration-dialog.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    HeaderComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
   // AdministrationComponent,
   // AdminProductsComponent,
   // AdminUsersComponent,
   // PizzasBannerComponent,
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
    AppRoutingModule,

    HeaderComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    RegistrationDialogComponent,
   // AdministrationComponent,
   // AdminProductsComponent,
   // AdminUsersComponent,
    //PizzasBannerComponent,
    FooterComponent
  ]
})
export class SharedModule { }
