import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyUaPipe} from "../../shared/pipes/currency-ua.pipe";
import {RouterModule} from "@angular/router";
import {ShoppingCartComponent} from "./shopping-cart.component";
import {ShoppingCartItemComponent} from "../shopping-cart-item/shopping-cart-item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";



@NgModule({
  declarations: [ShoppingCartComponent, ShoppingCartItemComponent, CurrencyUaPipe],
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
      }
    ])
  ],
  providers: []
})
export class ShoppingCartModule { }
