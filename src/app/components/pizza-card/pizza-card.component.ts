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

  private shoppingCart$: Observable<Pizza[]>;
  public pizzaSize = [
    {name: 'Мала 22 см', code: 'small'},
    {name: 'Середня 30 см', code: 'medium'},
    {name: 'Велика 36 см', code: 'big'}
  ]
  public selectedPizzaSize: any

  constructor(private shoppingService: ShoppingCartService) {
    this.shoppingCart$ = this.shoppingService.shoppingCart$;

  }

  ngOnInit(): void {
    this.shoppingService.loadAll();

  }

  toShoppingCart(item: Pizza): void{
    this.shoppingService.create(item)

  }
}
