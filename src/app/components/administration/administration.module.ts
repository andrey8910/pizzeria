import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {AdministrationComponent} from "./administration.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {AdminGuard} from "../../shared/administration.guard";
import {AdminGuardService} from "../../shared/services/admin-guard.service";
import { AdminUserPageComponent } from './admin-user-page/admin-user-page.component';
import { AdminSliderComponent } from './admin-slider/admin-slider.component';


@NgModule({
  declarations: [AdministrationComponent, AdminProductsComponent, AdminUsersComponent, AdminUserPageComponent, AdminSliderComponent],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AdministrationComponent,
      },
      {
        path: 'users',
        pathMatch: 'full',
        component: AdminUsersComponent,
      },
      {
        path: 'user/:id',
        pathMatch: 'full',
        component: AdminUserPageComponent,
      },
      {
        path: 'slider',
        pathMatch: 'full',
        component: AdminSliderComponent,
      }
    ])
  ],
  exports: [

  ],
  providers: [AdminGuard, AdminGuardService]
})
export class AdministrationModule { }
