import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../services/local-storage.service";
import {LocalStorageKeys} from "../local-storage-keys";

@Injectable()

export class AdminAuthenticationGuard implements CanActivate, CanLoad {

  private isActive = false;
  private isLoad = false;

  constructor(
    private messageService : MessageService,
    private localStorageService : LocalStorageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData)){
      this.isActive = ((this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData).resultAuthentication.id == 1) && (this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData).resultAuthentication.name == 'administrator'))
    }

    return this.isActive;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData)){
      this.isLoad = ((this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData).resultAuthentication.id == 1) && (this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData).resultAuthentication.name == 'administrator'))
    }else{
      this.messageService.add({severity:'warn', summary: 'Увійдіть до системи, як адміністратор !'});
    }

    return this.isLoad;
  }
}
