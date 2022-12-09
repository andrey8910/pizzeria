import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule} from "@angular/router";
import {CustomerGuard} from "../../shared/services/customer.guard";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {MaterialModule} from "../../shared/material/material.module";



@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'account',
        pathMatch: 'full',
        component: UserPageComponent,
        canActivate : [CustomerGuard],

      }
    ])
  ],
  providers: [CustomerGuard]
})
export class UserAccountModule { }
