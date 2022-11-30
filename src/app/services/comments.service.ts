import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Comments} from "../interfaces/comments";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsSubject = new BehaviorSubject<Comments[]>([]);
  readonly commentsSub$ = this.commentsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getComments(){
   return this.httpClient.get<Comments[]>(environment.urlCommentsAll)
  }

  getCommentByProductId(id:number){

    this.httpClient.get<Comments[]>(`${environment.urlCommentsAll}?productId=${id}`)
      .pipe(
        tap((res:Comments[]) => {
          this.commentsSubject.next(Object.assign([], res))
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
