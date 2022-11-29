import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() pizzaId: number
  public itemPizzaId: number

  constructor() { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.itemPizzaId = this.pizzaId
  }

}
