import { Injectable } from '@angular/core';


@Injectable(
  {providedIn: 'root'}
)

export class AdminGuardService {
  public isAdmin: boolean = false;
  public adminLogin: string = 'admin';


  changeValueAdmin(loginValue: string): void {
    this.isAdmin = loginValue == this.adminLogin;
  }




}
