import {Component, OnInit, Inject, ChangeDetectionStrategy} from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';
import { ValidateLogin, ValidatePass } from '../../shared/Validators'
import {MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {AuthorizationDialogData} from '../../shared/interfaces/authorization-dialog';
import {RegistrationDialogComponent} from '../registration-dialog/registration-dialog.component'


@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationDialogComponent implements OnInit {
  public hidePass = true
  public authorizationData: AuthorizationDialogData
  formGroupAuthorization: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AuthorizationDialogComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizationDialogData,
  ) { }

  ngOnInit(): void {
    this.createFormAuthorization()
  }
  private createFormAuthorization(){
    this.formGroupAuthorization = new FormGroup({
      login: new FormControl('', [ValidateLogin]),
      password: new FormControl('', [ValidatePass])
    })
  };
  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(data: AuthorizationDialogData){
    this.authorizationData = data
  }

  public openRegistrationDialog(){
    const dialogRef = this.matDialog.open(RegistrationDialogComponent, {
      width: '400px',
      data: {},
      disableClose: true,
      panelClass: 'modal-dialog'

    });

     dialogRef.afterClosed().subscribe(result => {
     console.log(result)

     });
  }


}
