import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {AuthorizationDialogComponent} from '../authorization-dialog/authorization-dialog.component';
import {AuthorizationDialogData} from '../../interfaces/authorization-dialog';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public authorizationData: AuthorizationDialogData;
  public successfulAuthorization: boolean
  public showGoToAdmin: boolean = false
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  public openAuthorizationDialog(){
    const dialogRef = this.dialog.open(AuthorizationDialogComponent, {
      width: '400px',
      data: {},
      disableClose: true,
      panelClass: 'modal-dialog'

    });

    dialogRef.afterClosed().subscribe(result => {
     this.checkDataAuthorization(result)

    });


  }

  private checkDataAuthorization(data: AuthorizationDialogData){
    this.authorizationData = data;
    this.showGoToAdmin = data.login == 'admin';

    this.successfulAuthorization = this.authorizationData.isChecked
  }

}
