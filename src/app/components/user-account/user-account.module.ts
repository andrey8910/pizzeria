import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule} from "@angular/router";
import {CustomerGuard} from "../../shared/services/customer.guard";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {MaterialModule} from "../../shared/material/material.module";
import { OrderPendingComponent } from './orders-pending/order-pending.component';
import {FormsModule} from "@angular/forms";
import { OrderPageComponent } from './order-page/order-page.component';



@NgModule({
  declarations: [
    UserPageComponent,
    OrderPendingComponent,
    OrderPageComponent
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
      },
      {
        path: 'orders',
        pathMatch: 'full',
        component: OrderPendingComponent,
      },
      {
        path: 'order/:id',
        pathMatch: 'full',
        component: OrderPageComponent,
      }

    ])
  ],
  providers: [CustomerGuard]
})
export class UserAccountModule { }
