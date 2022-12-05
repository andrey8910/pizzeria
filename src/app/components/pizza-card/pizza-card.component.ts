import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import {  FormGroup, FormControl } from '@angular/forms';


import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import {Pizza} from "../../shared/interfaces/pizza";
import {PizzaOrder } from "../../shared/interfaces/pizza-order";
import { SizeParam } from '../../shared/interfaces/size-param'

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

  constructor(
    private shoppingService: ShoppingCartService,

    ) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingService.shoppingCart$;
    this.shoppingService.loadAll();
    this.selectedPizzaSize = this.pizzaSize[0];
    this.pizzaParamsSelectForm = new FormGroup({
      pizzaSelectSize: new FormControl(this.pizzaSize[0])
    })
  }

  onSelectPizzaSize(event: any){
  const  param: SizeParam = event.key
    this.selectedPizzaWeight = this.pizzaItem.params.weight[param]
    this.selectedPizzaPrice = this.pizzaItem.params.price[param]

  }

  toShoppingCart(item: Pizza): void{
    const itemOrder: PizzaOrder = {
      ...item,
      orderId: 0,
      size: this.pizzaParamsSelectForm.controls['pizzaSelectSize'].value.name,
      weight: this.selectedPizzaWeight ? this.selectedPizzaWeight : item.minWeight ,
      price: this.selectedPizzaPrice ? this.selectedPizzaPrice : item.minPrice,
      quantity: 1
    }
    this.shoppingService.create(itemOrder)
  }

}
