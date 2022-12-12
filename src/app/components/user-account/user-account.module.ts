import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule} from "@angular/router";
import {CustomerGuard} from "../../shared/services/customer.guard";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {MaterialModule} from "../../shared/material/material.module";
import { OrderPendingComponent } from './order-pending/order-pending.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserPageComponent,
    OrderPendingComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UserPageComponent,
        canActivate : [CustomerGuard],

      }

    ])
  ],
  providers: [CustomerGuard]
})
export class UserAccountModule { }
