import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ShoppingCartComponent} from "./shopping-cart.component";
import {ShoppingCartItemComponent} from "../shopping-cart-item/shopping-cart-item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import { OrderComponent } from './order/order.component';
import {CustomerGuard} from "../../shared/services/customer.guard";
import {UserAuthenticationCheckService} from "../../shared/services/user-authentication-check.service";



@NgModule({
  declarations: [ShoppingCartComponent, ShoppingCartItemComponent, OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component:  ShoppingCartComponent,
      },
      {
        path: 'order',
        pathMatch: 'full',
        canActivate : [CustomerGuard],
        component:  OrderComponent,
      }

    ])
  ],
  providers: [CustomerGuard, UserAuthenticationCheckService]
})
export class ShoppingCartModule { }
