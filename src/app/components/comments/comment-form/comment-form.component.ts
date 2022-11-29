import { Component, OnInit } from '@angular/core';
import {UserAuthenticationCheckService} from '../../../services/user-authentication-check.service';
import {MessageService} from 'primeng/api';
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../../interfaces/authorization-dialog";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  public rating: number;
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultUserAuthentication: AuthorizationDialogData

  constructor(private userAuthenticationCheckService : UserAuthenticationCheckService,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.initialization()
  }

  private  initialization(){
    this.userAuthenticationCheck$ = this.userAuthenticationCheckService.userAuthenticationCheck$
    this.userAuthenticationCheck$
      .pipe(
        tap((data:AuthorizationDialogData) => {
          this.resultUserAuthentication = data
        })
      )
      .subscribe()
  }

  public addComment(){
    if(this.resultUserAuthentication.isPassedAuthentication){
      console.log('!!!!!!!!!!!')
    }else{
        this.showErrorAuthentication()
    }
  }

  showErrorAuthentication() {
    this.messageService.add({severity:'error', summary: `Помилка ! `, detail: 'Необхідно увійти до системи!'});
  }

}
