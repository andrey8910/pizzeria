import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {MessageService} from "primeng/api";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageKeys} from "../local-storage-keys"

@Injectable()
export class CustomerGuard implements CanActivate {

  private isLoggedIn = false;

  constructor(
    private messageService : MessageService,
    private localStorageService : LocalStorageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData)){
      this.isLoggedIn = this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData).isPassedAuthentication
    }else{
      this.messageService.add({severity:'warn', summary: 'Увійдіть до системи !', detail: 'Для оформлення замовлення необхідно увійти до системи. '});
    }
    return this.isLoggedIn;
  }

}
