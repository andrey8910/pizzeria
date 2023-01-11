import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Comments} from "../interfaces/comments";

@Injectable({
  providedIn: 'root'
})
export class ChangeCommentsSubjectBehaviorService {

  private commentsSubject = new BehaviorSubject<Comments[]>([]);
  readonly commentsSub$ = this.commentsSubject.asObservable();

  constructor() { }

  changeCommentsSubject(comments: Comments[]){
    this.commentsSubject.next(Object.assign([], comments))
  }
}
