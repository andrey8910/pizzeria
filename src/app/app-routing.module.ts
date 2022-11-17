import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PizzasAllComponent } from './components/pizzas-all/pizzas-all.component';
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {AdminGuardService} from "./services/admin-guard.service"
import {AdminGuard} from "./shared/administration.guard"


const routes: Routes = [
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'pizzas', component: PizzasAllComponent },
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
