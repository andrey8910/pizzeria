import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {PizzasAllComponent} from './pizzas-all.component';
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {MaterialModule} from "../../shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PizzasBannerComponent} from "./pizzas-banner/pizzas-banner.component";
import {PizzaCardComponent} from "../pizza-card/pizza-card.component";
//import {ProductsService} from "../../services/products.service";
//import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ProductsFilterPipe} from "../../shared/pipes/products-filter.pipe";
//import {CurrencyUaPipe} from "../../shared/pipes/currency-ua.pipe";


@NgModule({
  declarations: [PizzasAllComponent, PizzasBannerComponent,PizzaCardComponent,ProductsFilterPipe],
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
        component: PizzasAllComponent
      }
    ])
  ],
  providers: [ProductsFilterPipe]


})
export class PizzasAllModule { }
