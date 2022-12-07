import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Observable } from "rxjs";
import {MatDialog} from '@angular/material/dialog';

import {AuthorizationDialogComponent} from '../authorization-dialog/authorization-dialog.component';
import {AuthorizationDialogData} from '../../shared/interfaces/authorization-dialog';
import {UserAuthenticationCheckService} from "../../shared/services/user-authentication-check.service";
import {LocalStorageService} from '../../shared/services/local-storage.service'
import {LocalStorageKeys} from '../../shared/local-storage-keys'
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent implements OnInit {

  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public successfulAuthorization: boolean
  public showGoToAdmin: boolean = false
  public checkAuthentication: AuthorizationDialogData

  constructor(
    public dialog: MatDialog,
    private localStorageService : LocalStorageService,
    private usersCheckService: UserAuthenticationCheckService,

  ) { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.userAuthenticationCheck$ = this.usersCheckService.userAuthenticationCheck$
    if(this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData) !== null){
      const localDataAuthorization = this.localStorageService.getLocalStorage(LocalStorageKeys.AuthorizationData);
      this.usersCheckService.userAuthentication(localDataAuthorization)

      this.userAuthenticationCheck$.pipe(
        tap(res => {
            this.checkAuthentication = res
            this.showGoToAdmin = this.checkAuthentication.login == 'admin'
            this.successfulAuthorization = this.checkAuthentication.isPassedAuthentication
          }
        )
      ).subscribe()
    }
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
