import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {UserAuthenticationCheckService} from '../../../services/user-authentication-check.service';
import {CommentsService} from '../../../services/comments.service';
import {MessageService} from 'primeng/api';
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../../interfaces/authorization-dialog";
import {Comments} from "../../../interfaces/comments";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() itemPizzaId: number;
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultUserAuthentication: AuthorizationDialogData
  public addCommentForm: FormGroup;

  constructor(private userAuthenticationCheckService : UserAuthenticationCheckService,
              private messageService: MessageService,
              private commentsService : CommentsService) { }

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

    this.addCommentForm = new FormGroup({
        rating: new FormControl(null),
        text:   new FormControl(''),
        productAdvantages: new FormControl(''),
        productFlaws: new FormControl('')
    })
  }

  public addComment(){
    if(this.resultUserAuthentication.isPassedAuthentication){
      let newComment: Comments ={
        productId: this.itemPizzaId,
        author: this.resultUserAuthentication.login,
        rating: this.addCommentForm.get('rating')?.value,
        text: this.addCommentForm.get('text')?.value,
        productAdvantages: this.addCommentForm.get('productAdvantages')?.value,
        productFlaws: this.addCommentForm.get('productFlaws')?.value,
      }
      this.commentsService.addComment(newComment)
      this.addCommentForm.reset()

    }else{
        this.showErrorAuthentication()
    }
  }

  showErrorAuthentication() {
    this.messageService.add({severity:'error', summary: `Помилка ! `, detail: 'Необхідно увійти до системи!'});
  }

}
