import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthorizationDialog} from '../../interfaces/authorization-dialog'


@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss']
})
export class AuthorizationDialogComponent implements OnInit {
  public hide = true

  constructor(
    public dialogRef: MatDialogRef<AuthorizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizationDialog,
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
