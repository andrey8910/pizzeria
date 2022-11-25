import { Component, OnInit, Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidateLogin, ValidatePass, ValidatePassConfirm, passEqual,} from "../../interfaces/Validators";
import {AuthorizationDialogData} from "../../interfaces/authorization-dialog";

export interface DialogData {
  answer: string;
  name: string;
}
@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {
  public hidePass = true
  public hidePassConfirm = true
  public formGroupRegistration: FormGroup;
  private registrationData : AuthorizationDialogData

  constructor( public dialogRef: MatDialogRef<RegistrationDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.createFormRegistration()
  }

  private createFormRegistration(){
    this.formGroupRegistration = new FormGroup<any>({
      login: new FormControl('', [Validators.required, ValidateLogin]),
      userPass: new FormControl('', [Validators.required, ValidatePass]),
      confirmUserPassword: new FormControl('', [Validators.required, ValidatePassConfirm])
    }, passEqual('userPass', 'confirmUserPassword'))
  };





  public onSubmit(data: AuthorizationDialogData){
    this.registrationData = data
    console.log(this.formGroupRegistration)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
