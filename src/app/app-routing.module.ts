import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuardService} from "./shared/services/admin-guard.service";
import {AdminGuard} from "./shared/administration.guard";
import {UserAuthenticationCheckService} from "./shared/services/user-authentication-check.service";



const routes: Routes = [
  { path: '', redirectTo: 'pizza', pathMatch: 'full'},

  { path: 'pizza',
    pathMatch: 'full',
    loadChildren: () => import('./components/pizzas-all/pizzas-all.module')
      .then(module => module.PizzasAllModule)
  },

  { path: 'pizza/:id',
    loadChildren: () => import('./components/pizza-details/pizza-details.module')
      .then(module => module.PizzaDetailsModule)

  },
  { path: 'shopping',
    loadChildren: () => import('./components/shopping-cart/shopping-cart.module')
      .then(module => module.ShoppingCartModule)

  },
  { path: 'admin',
    loadChildren: () => import('./components/administration/administration.module')
      .then(module => module.AdministrationModule),
    canActivate: [AdminGuard]
  },

  { path: '**',
    loadChildren: () => import('./components/not-found-page/not-found-page.module')
      .then(module => module.NotFoundPageModule)
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  providers: [AdminGuard, AdminGuardService, UserAuthenticationCheckService]
})
export class AppRoutingModule { }
