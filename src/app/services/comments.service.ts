import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Comments} from "../interfaces/comments";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getComments(){
   return this.httpClient.get<Comments[]>(environment.urlCommentsAll)
  }

  getCommentByProductId(id:number){
    return this.httpClient.get<Comments[]>(`${environment.urlCommentsAll}?productId=${id}`)
  }
}
