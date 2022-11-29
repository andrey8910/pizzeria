import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { Comments } from '../../../interfaces/comments';
import {catchError, finalize, tap} from "rxjs/operators";



@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() itemPizzaId: number

  public loader = false;

  public comments: Comments[];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.initialization()

  }

  private initialization(){

    this.loader = true
    this.commentsService.getCommentByProductId(this.itemPizzaId)
      .pipe(
        tap((comments:Comments[]) => {
          this.comments = comments

        }),
        finalize(() => {
          this.loader = false
        }),
        catchError((err) =>  {
          throw 'Помилка сервера. Деталі: ' + err
        })
      )
      .subscribe()
  }

}
