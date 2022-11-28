import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PizzasAllComponent } from './components/pizzas-all/pizzas-all.component';
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {PizzaDetailsComponent} from "./components/pizza-details/pizza-details.component"

import {AdminGuardService} from "./services/admin-guard.service";
import {AdminGuard} from "./shared/administration.guard";


const routes: Routes = [
  { path: '', redirectTo: '/pizza', pathMatch: 'full' },
  { path: 'pizza', component: PizzasAllComponent },
  { path: 'pizza/:id', component: PizzaDetailsComponent},
  { path: 'shopping', component: ShoppingCartComponent },
  { path: 'admin', component: AdministrationComponent, canActivate: [AdminGuard] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  providers: [AdminGuard, AdminGuardService]
})
export class AppRoutingModule { }
