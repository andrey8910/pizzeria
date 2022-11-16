import { Component, OnInit, Inject } from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthorizationDialogData} from '../../interfaces/authorization-dialog'


@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss']
})
export class AuthorizationDialogComponent implements OnInit {
  public hidePass = true
  public authorizationData: AuthorizationDialogData
  formGroupAuthorization: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AuthorizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizationDialogData,
  ) { }

  ngOnInit(): void {
    this.createFormAuthorization()
  }
  private createFormAuthorization(){
    this.formGroupAuthorization = new FormGroup({
      login: new FormControl(null),
      password: new FormControl(null)
    })
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(data: AuthorizationDialogData){
    this.authorizationData = data
    this.authorizationCheck(data)

  }

  private authorizationCheck(data: AuthorizationDialogData){
    if(data.login == 'admin' && data.password == '123'){
      this.authorizationData.isChecked = true
    }else if(data.login == 'user' && data.password == '123'){
      this.authorizationData.isChecked = true
    }
  }
}
