import {Component, OnInit, Inject, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidateLogin, ValidatePass, ValidatePassConfirm, passEqual,} from "../../shared/Validators";
import {Users} from "../../shared/interfaces/users";
import {UsersService} from '../../shared/services/users.service'
import {MessageService} from 'primeng/api';
import {tap} from "rxjs/operators";
import {RegistrationData} from "../../shared/interfaces/registration-data";

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationDialogComponent implements OnInit {
  public hidePass = true
  public hidePassConfirm = true
  public formGroupRegistration: FormGroup;
  private registrationData : Users

  constructor( public dialogRef: MatDialogRef<RegistrationDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: RegistrationData,
               private usersService: UsersService,
               private messageService: MessageService) { }

  ngOnInit(): void {
    this.createFormRegistration()
  }

  private createFormRegistration(){
    this.formGroupRegistration = new FormGroup<any>({
      name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(12)]),
      login: new FormControl('', [Validators.required, ValidateLogin]),
      password: new FormControl('', [Validators.required, ValidatePass]),
      confirmPassword: new FormControl('', [Validators.required, ValidatePassConfirm])
    }, passEqual('password', 'confirmPassword'))
  };

  public onSubmit(data: RegistrationData){
   this.registrationData = {
     id: 0,
     name: data.name ,
     login: data.login,
     password: data.password,

   }

    this.usersService.addUser(this.registrationData)
      .pipe(
        tap((res:Users) => {

          this.showSuccessRegistrationUser(res.name)
          console.log(res)
        })
      )
      .subscribe()
  }

  private showSuccessRegistrationUser(name: string) {
    this.messageService.add({severity:'success', summary: `Вітаємо, ${name} !`, detail:'вас зареэстровано!'});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
