import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {MatDialog} from '@angular/material/dialog';

import {AuthorizationDialogComponent} from '../authorization-dialog/authorization-dialog.component';
import {AuthorizationDialogData} from '../../interfaces/authorization-dialog';
import {UserAuthenticationCheckService} from "../../services/user-authentication-check.service";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public successfulAuthorization: boolean
  public showGoToAdmin: boolean = false
  public checkAuthentication: AuthorizationDialogData

  constructor(
    public dialog: MatDialog,

    private usersCheckService: UserAuthenticationCheckService,

  ) { }

  ngOnInit(): void {
    this.userAuthenticationCheck$ = this.usersCheckService.userAuthenticationCheck$
  }
  public openAuthorizationDialog(){
    const dialogRef = this.dialog.open(AuthorizationDialogComponent, {
      width: '460px',
      data: {},
      disableClose: true,
      panelClass: 'modal-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
     this.checkDataAuthorization(result)
    });
  }

  private checkDataAuthorization(data: AuthorizationDialogData){
    this.usersCheckService.userAuthentication(data)

    this.userAuthenticationCheck$.pipe(
      tap(res => {
        this.checkAuthentication = res
        this.showGoToAdmin = this.checkAuthentication.login == 'admin'
        this.successfulAuthorization = this.checkAuthentication.isPassedAuthentication
        }
      )
    ).subscribe()
  }

  public logOut(){
    this.usersCheckService.logOutUser()
  }



}
