import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import {  FormGroup, FormControl } from '@angular/forms';

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
  public pizzaParamsSelectForm: FormGroup;
  public pizzaSize: any  = [
    {name: 'Мала (22см)', key: 'small'},
    {name: 'Середня (30см)', key: 'medium'},
    {name: 'Велика (36см)', key: 'big'}
  ];

  public selectedPizzaSize: any;
  public selectedPizzaWeight: number;
  public selectedPizzaPrice: number;

  constructor(private shoppingService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingService.shoppingCart$;
    this.shoppingService.loadAll();
    this.selectedPizzaSize = this.pizzaSize[0];
    this.pizzaParamsSelectForm = new FormGroup({
      pizzaSelectSize: new FormControl()
    })
  }

  onSelectPizzaSize(size: string){

    switch (size){
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
        this.selectedPizzaWeight = 0
    }
  }

  toShoppingCart(item: Pizza): void{

    const itemOrder: PizzaOrder = {
      ...item,
      orderId: 0,
      size: this.pizzaParamsSelectForm.controls['pizzaSelectSize'].value.name,
      weight: this.selectedPizzaWeight,
      price: this.selectedPizzaPrice
    }

    this.shoppingService.create(itemOrder)
  }






}
