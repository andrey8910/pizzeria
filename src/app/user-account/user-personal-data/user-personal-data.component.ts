import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {UserAuthenticationCheckService} from "../../core/services/user-authentication-check.service";
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../core/interfaces/authorization-dialog";
import {finalize, tap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../core/interfaces/users";
import {passEqual, ValidateLogin, ValidatePass, ValidatePassConfirm} from "../../core/Validators";
import {RegistrationData} from "../../core/interfaces/registration-data";
import {UsersService} from "../../core/services/users.service";

@Component({
  selector: 'app-user-personal-data',
  templateUrl: './user-personal-data.component.html',
  styleUrls: ['./user-personal-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserPersonalDataComponent implements OnInit {

  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultAuth: AuthorizationDialogData;

  public showEditor = false
  public isEditedData = false

  public formGroupEditorPersonalData: FormGroup;
  public hidePassValue = false
  public hidePassConfirm = false

  constructor( private location: Location,
               private userAuthCheckService: UserAuthenticationCheckService,
               private usersService: UsersService,
               private usersCheckService: UserAuthenticationCheckService,
               private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.init()
  }

  private init(){
    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$
    this.userAuthenticationCheck$.pipe(
      tap(res => {
        if(res.isPassedAuthentication){
          this.resultAuth = res
          this.cdr.markForCheck();
        }
      })
    ).subscribe()

    this.createFormEditPersonalData()
  }

  private createFormEditPersonalData(){
    this.formGroupEditorPersonalData = new FormGroup<any>({
      name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(12)]),
      login: new FormControl('', [Validators.required, ValidateLogin]),
      password: new FormControl('', [Validators.required, ValidatePass]),
      confirmPassword: new FormControl('', [Validators.required, ValidatePassConfirm])
    }, passEqual('password', 'confirmPassword'))
  }

  public comeBack(){
    this.location.back()
  }

  public onSubmitEditorForm(value: RegistrationData){

    const editUserData: RegistrationData = {
      name: value.name,
      login: value.login,
      password: value.password
    }
    const userNewData: AuthorizationDialogData = {
      isPassedAuthentication: this.resultAuth.isPassedAuthentication,
      login: value.login,
      password: value.password,

      resultAuthentication: {
        id: this.resultAuth.resultAuthentication.id,
        name: value.name,
        login: value.login,
        password: value.password
      }

    }

    this.usersService.editUser(editUserData, this.resultAuth.resultAuthentication.id)
      .pipe(
        tap((res:Users) => {
          this.resultAuth.resultAuthentication.name = res.name
          this.resultAuth.resultAuthentication.login = res.login
          this.resultAuth.resultAuthentication.password = res.password
          this.usersCheckService.userAuthentication(userNewData)
          this.cdr.markForCheck();
        }),
        finalize(() => {
          this.isEditedData = true
        })
      ).subscribe()
  }
}
