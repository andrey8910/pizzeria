import { Injectable, OnInit } from '@angular/core';
import {Users} from "../interfaces/users";
import {AuthorizationDialogData} from '../interfaces/authorization-dialog';
import {UsersService} from "./users.service";
import {LocalStorageService} from "./local-storage.service";
import {MessageService} from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import {catchError, finalize, tap} from "rxjs/operators";
import {AdminGuardService} from "./admin-guard.service";
import {LocalStorageKeys} from "../local-storage-keys"



@Injectable(
  {providedIn: 'root'}
)
export class UserAuthenticationCheckService implements OnInit{
  private userAuthSubject = new BehaviorSubject<AuthorizationDialogData>({
    login: '',
    password: '',
    isPassedAuthentication: false,
    resultAuthentication: {
      id: 0,
      name : '',
      login : '',
      password : ''
    }
  });
  readonly userAuthenticationCheck$ = this.userAuthSubject.asObservable();
  private allUsers: Users[];


  constructor(private usersService: UsersService,
              private messageService : MessageService,
              private adminGuard : AdminGuardService,
              private localStorageService : LocalStorageService
  ) { }

  ngOnInit() {

  }

  public userAuthentication(data : AuthorizationDialogData){

    if(data){
      this.usersService.getUsers()
        .pipe(
          tap((data:Users[]) => {
            this.allUsers = data
          }),
          finalize(() => {

            if(this.allUsers.some(user => user.login === data.login)){

              this.allUsers.forEach((user: Users) => {
                  if(user.login == data.login && user.password == data.password){
                    if(user.login == 'admin'){
                      this.adminGuard.changeValueAdmin(data.login)
                    }
                    data.isPassedAuthentication = true
                    data.resultAuthentication = user
                    this.userAuthSubject.next(Object.assign({}, data));
                    this.localStorageService.setLocalStorage(LocalStorageKeys.AuthorizationData, data);
                  }
                }
              )
            }else{
              this.showErrorAuthor(data.login)
            }
          }),
          catchError((err) =>  {throw 'Помилка сервера. Деталі: ' + err})
        ).subscribe()
    }else{
      this.showErrorAuthor('')
    }
  }



  public logOutUser(){
    this.userAuthSubject.next(Object.assign({}));
    this.adminGuard.changeValueAdmin('');
    this.localStorageService.removeLocalStorage(LocalStorageKeys.AuthorizationData)
    this.showWarnLogOut()
  }

  showSuccessAuthor(name: string) {
    this.messageService.add({severity:'success', summary: `Вітаємо, ${name} !`, detail:'ви увійшли до системи'});
  }

  showWarnLogOut() {
    this.messageService.add({severity:'warn', summary: 'Вихід !', detail: 'ви вийшли із системи'});
  }

  showErrorAuthor(login: string) {
    this.messageService.add({severity:'error', summary: `Помилка! ${login} `, detail: 'Помилка авторизації !'});
  }
}
