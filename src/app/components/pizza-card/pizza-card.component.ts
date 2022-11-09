import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import {Pizza} from "../../interfaces/pizza";

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent implements OnInit {

  @Input() pizzaItem: Pizza

  private shoppingCart$: Observable<Pizza[]>

  constructor(private shoppingService: ShoppingCartService) {
    this.shoppingCart$ = this.shoppingService.shoppingCart$;
  }

  ngOnInit(): void {
    this.shoppingService.loadAll();
  }

  toShoppingCart(item: Pizza): void{
    this.shoppingService.create(item)
    console.log(this.shoppingCart$)
  }
}
