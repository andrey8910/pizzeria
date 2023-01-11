import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuardService} from "./core/guards/admin-guard.service";
import {AdminGuard} from "./core/guards/administration.guard";
import {UserAuthenticationCheckService} from "./core/services/user-authentication-check.service";
import {AdminAuthenticationGuard} from "./core/guards/admin-authentication.guard";



const routes: Routes = [
  { path: '', redirectTo: 'pizza', pathMatch: 'full'},

  { path: 'pizza',
    pathMatch: 'full',
    loadChildren: () => import('./pizzas-all/pizzas-all.module')
      .then(module => module.PizzasAllModule)
  },

  { path: 'pizza/:id',
    loadChildren: () => import('./pizza-details/pizza-details.module')
      .then(module => module.PizzaDetailsModule)

  },
  { path: 'shopping',
    loadChildren: () => import('./shopping-cart/shopping-cart.module')
      .then(module => module.ShoppingCartModule)
  },
  { path: 'admin',
    loadChildren: () => import('./administration/administration.module')
      .then(module => module.AdministrationModule),
    canLoad: [AdminAuthenticationGuard],
    canActivate: [AdminAuthenticationGuard]
  },
  { path: 'user',
    loadChildren: () => import('./user-account/user-account.module')
      .then(module => module.UserAccountModule)
  },

  { path: '**',
    loadChildren: () => import('./layout/not-found-page/not-found-page.module')
      .then(module => module.NotFoundPageModule)
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  providers: [AdminGuard, AdminGuardService,AdminAuthenticationGuard, UserAuthenticationCheckService]
})
export class AppRoutingModule { }
