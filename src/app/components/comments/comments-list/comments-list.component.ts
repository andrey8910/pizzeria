import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { Comments } from '../../../interfaces/comments';
import {Observable} from "rxjs";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() itemPizzaId: number

  public loader = false;

  public comments: Comments[];

  public commentsSub$: Observable<Comments[]> ;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.loader = true
    this.commentsService.getCommentByProductId(this.itemPizzaId)
    this.commentsSub$ = this.commentsService.commentsSub$

  }

}
