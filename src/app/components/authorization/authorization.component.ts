import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthorizationDialogComponent} from '../authorization-dialog/authorization-dialog.component'

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialogFirst(){
    const dialogRef = this.dialog.open(AuthorizationDialogComponent, {
      width: '400px',
      data: {},
      disableClose: true,
      panelClass: 'modal-dialog'

    });

    dialogRef.afterClosed().subscribe(result => {
     // this.answerCompanionDialogFirst = result;
      console.log(result)
    });
  }

}
