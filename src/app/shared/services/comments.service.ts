import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Comments} from "../interfaces/comments";
import {tap} from "rxjs/operators";
import {ChangeCommentsSubjectBehaviorService} from "./change-comments-subject-behavior.service";


@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  constructor(private httpClient: HttpClient,
              private changeCommentsService: ChangeCommentsSubjectBehaviorService) { }

  getCommentByProductId(id:number){

    this.httpClient.get<Comments[]>(`${environment.urlCommentsAll}?productId=${id}`)
      .pipe(
        tap((res:Comments[]) => {
          this.changeCommentsService.changeCommentsSubject(res)
        })
      )
      .subscribe()
  }

  addComment(comment:Comments){
     this.httpClient.post<Comments>('http://localhost:3001/comments', comment)
       .pipe(
         tap((res:Comments) => {
           this.getCommentByProductId(res.productId)
         })
       )
       .subscribe()
  }
}
