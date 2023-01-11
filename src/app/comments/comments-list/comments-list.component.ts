import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { CommentsService } from '../../core/services/comments.service';
import { Comments } from '../../core/interfaces/comments';
import {Observable} from "rxjs";
import {ChangeCommentsSubjectBehaviorService} from "../../core/services/change-comments-subject-behavior.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent implements OnInit {
  @Input() itemPizzaId: number

  public loader = false;

  public comments: Comments[];

  public commentsSub$: Observable<Comments[]> ;

  constructor(private commentsService: CommentsService,
              private changeCommentsService: ChangeCommentsSubjectBehaviorService) { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.loader = true
    this.commentsService.getCommentByProductId(this.itemPizzaId)
    this.commentsSub$ = this.changeCommentsService.commentsSub$

  }

}
