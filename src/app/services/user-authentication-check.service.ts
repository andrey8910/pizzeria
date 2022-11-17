import { Injectable, OnInit } from '@angular/core';
import {Users} from "../interfaces/users";
import {AuthorizationDialogData} from '../interfaces/authorization-dialog';
import {UsersService} from "./users.service";
import {MessageService} from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import {catchError, finalize, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationCheckService implements OnInit{

  private userAuthSubject = new BehaviorSubject<any>({});
  readonly userAuthenticationCheck$ = this.userAuthSubject.asObservable();
  private allUsers: Users[];

  constructor(private usersService: UsersService,
              private messageService : MessageService
  ) { }

  ngOnInit() {
  }

  public userAuthentication(data : AuthorizationDialogData){

    this.usersService.getUsers()
      .pipe(
        tap((data:Users[]) => {
          this.allUsers = data
        }),
        finalize(() => {

          if(this.allUsers.some(user =>user.login === data.login)){
            this.allUsers.forEach((user: Users) => {
                if(user.login == data.login && user.password == data.password){
                  data.isPassedAuthentication = true
                  data.resultAuthentication = user
                  this.userAuthSubject.next(Object.assign({}, data));
                  this.showSuccessAuthor(data.resultAuthentication.name)
                }
              }
              )
          }else{
            this.showErrorAuthor(data.login)
          }



        }),
        catchError((err) =>  {throw 'Помилка сервера. Деталі: ' + err})
      ).subscribe()


  }

  showSuccessAuthor(name: string) {
    this.messageService.add({severity:'success', summary: `Вітаємо, ${name} !`, detail:'ви увійшли до системи'});
  }

  showErrorAuthor(login: string) {
    this.messageService.add({severity:'error', summary: `Помилка! ${login} !`, detail: 'Помилка авторизації !'});
  }
}
