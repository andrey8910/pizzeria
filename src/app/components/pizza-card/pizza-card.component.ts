import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import {Pizza} from "../../interfaces/pizza";
import {PizzaOrder} from "../../interfaces/pizza-order";

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent implements OnInit {

  @Input() pizzaItem: Pizza

  private shoppingCart$: Observable<PizzaOrder[]>;

  public pizzaSize: any[] = [
    {name: 'Мала (22см)', key: 'small'},
    {name: 'Середня (30см)', key: 'medium'},
    {name: 'Велика (36см)', key: 'big'}
  ];

  public selectedPizzaSize: any;
  public selectedPizzaWeight: any;
  public selectedPizzaPrice: any;

  constructor(private shoppingService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingService.shoppingCart$;
    this.shoppingService.loadAll();
    this.selectedPizzaSize = this.pizzaSize[0];
  }

  onSelectPizzaSize(event: any){
    switch (event.key){
      case "small":
        this.selectedPizzaWeight = this.pizzaItem.params.weight.small
        this.selectedPizzaPrice = this.pizzaItem.params.price.small
        break;

      case "medium":
        this.selectedPizzaWeight = this.pizzaItem.params.weight.medium
        this.selectedPizzaPrice = this.pizzaItem.params.price.medium
        break;

      case "big":
        this.selectedPizzaWeight = this.pizzaItem.params.weight.big
        this.selectedPizzaPrice = this.pizzaItem.params.price.big
        break;

      default:
        this.selectedPizzaWeight = null
    }
  }

  toShoppingCart(item: Pizza): void{
    item.order.size = this.selectedPizzaSize.name;
    item.order.weight = this.selectedPizzaWeight ? this.selectedPizzaWeight : item.minWeight;
    item.order.price = this.selectedPizzaPrice ? this.selectedPizzaPrice : item.minPrice

    this.shoppingService.create(item)
  }






}
