import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageKeys} from "../local-storage-keys";
import {LocalStorageService} from "../services/local-storage.service";
import {OrdersService} from "../services/orders.service";
import {tap} from "rxjs/operators";
import {Orders} from "../interfaces/orders";

@Injectable({
  providedIn: 'root'
})
export class OrdersGuardGuard implements CanActivate {
  private isUserOrder =false
  constructor(private readonly router: Router,
              private ordersService : OrdersService,
              private localStorageService : LocalStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData) !== null){
      const localDataAuthorization = this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData);
      this.ordersService.getOrderById(route.params['id'])
        .pipe(
          tap(
            (res: Orders[]) => {

              (localDataAuthorization.resultAuthentication.id == res[0].clientId) ? this.isUserOrder = true : this.isUserOrder = false
            }
          )
        ).subscribe()
    }

   return this.isUserOrder

  }

}
