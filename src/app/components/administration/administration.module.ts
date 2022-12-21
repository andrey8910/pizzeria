import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdministrationComponent} from "./administration.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {AdminGuard} from "../../shared/administration.guard";
import {AdminGuardService} from "../../shared/services/admin-guard.service";


@NgModule({
  declarations: [AdministrationComponent, AdminProductsComponent, AdminUsersComponent],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
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
      }
    ])
  ],
  exports: [

  ],
  providers: [AdminGuard, AdminGuardService]
})
export class AdministrationModule { }
