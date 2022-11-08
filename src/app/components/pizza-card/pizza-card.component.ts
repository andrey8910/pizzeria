import { Component, OnInit, Input } from '@angular/core';
import {Pizza} from "../../interfaces/pizza";

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent implements OnInit {

  @Input() pizzaItem: Pizza
  constructor() { }

  ngOnInit(): void {
    console.log(this.pizzaItem)
  }

}
