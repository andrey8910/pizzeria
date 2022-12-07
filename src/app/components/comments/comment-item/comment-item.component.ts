import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Comments} from '../../../shared/interfaces/comments'

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentItemComponent implements OnInit {

  @Input() commentItem: Comments;
  public rating: number


  constructor() { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.rating = this.commentItem.rating
  }
}
