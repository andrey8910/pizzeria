import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {AdministrationComponent} from "./administration.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {PrimengModule} from "../shared/primeng/primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material/material.module";
import {AdminGuard} from "../core/guards/administration.guard";
import {AdminGuardService} from "../core/guards/admin-guard.service";
import { AdminUserPageComponent } from './admin-user-page/admin-user-page.component';
import { AdminSliderComponent } from './admin-slider/admin-slider.component';
import { AdminSliderItemComponent } from './admin-slider-item/admin-slider-item.component';
import { AdminSliderEditorComponent } from './admin-slider-editor/admin-slider-editor.component';
import { AdminProductPageComponent } from './admin-product-page/admin-product-page.component';
import { AdminAddEditProductComponent } from './admin-add-edit-product/admin-add-edit-product.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminUserPageComponent,
    AdminSliderComponent,
    AdminSliderItemComponent,
    AdminSliderEditorComponent,
    AdminProductPageComponent,
    AdminAddEditProductComponent,
  ],
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
        path: 'products',
        pathMatch: 'full',
        component: AdminProductsComponent,
      },
      {
        path: 'product/:id',
        pathMatch: 'full',
        component: AdminProductPageComponent,
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
  exports: [],
  providers: [AdminGuard, AdminGuardService]
})
export class AdministrationModule { }
