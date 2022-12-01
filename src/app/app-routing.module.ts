import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {PizzaDetailsComponent} from "./components/pizza-details/pizza-details.component"
import {AdminGuardService} from "./services/admin-guard.service";
import {AdminGuard} from "./shared/administration.guard";


const routes: Routes = [
  { path: '', redirectTo: 'pizza', pathMatch: 'full'},

  { path: 'pizza',
    pathMatch: 'full',
    loadChildren: () => import('./components/pizzas-all/pizzas-all.module')
      .then(module => module.PizzasAllModule)
  },

  { path: 'pizza/:id', component: PizzaDetailsComponent},
  { path: 'shopping', component: ShoppingCartComponent },
  { path: 'admin', component: AdministrationComponent, canActivate: [AdminGuard] },

  { path: '**',
    loadChildren: () => import('./components/not-found-page/not-found-page.module')
      .then(module => module.NotFoundPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  providers: [AdminGuard, AdminGuardService]
})
export class AppRoutingModule { }
