import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PizzasAllComponent } from './components/pizzas-all/pizzas-all.component';
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {AdministrationComponent} from "./components/administration/administration.component"



const routes: Routes = [
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'pizzas', component: PizzasAllComponent },
  { path: 'shopping', component: ShoppingCartComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
