import {Component, OnInit} from '@angular/core';
import {Pizza} from "../../interfaces/pizza";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {Subscription} from 'rxjs';
import {ProductsService} from "../../services/products.service";
import {catchError, finalize, tap} from "rxjs/operators";
import {  FormGroup, FormControl } from '@angular/forms';
import {SizeParam} from "../../interfaces/size-param";
import {PizzaOrder} from "../../interfaces/pizza-order";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss']
})
export class PizzaDetailsComponent implements OnInit {
  public loader = false
  public itemPizza: Pizza
  public pizzaId: number
  private subscription: Subscription;
  public pizzaDetailsSelectForm: FormGroup;


  public selectedPizzaSize: any;
  public selectedPizzaWeight: number;
  public selectedPizzaPrice: number;

  public pizzaSize: any  = [
    {name: 'Мала (22см)', key: 'small'},
    {name: 'Середня (30см)', key: 'medium'},
    {name: 'Велика (36см)', key: 'big'}
  ];

  constructor(private activateRoute: ActivatedRoute,
              private location: Location,
              private productsService : ProductsService,
              private shoppingService: ShoppingCartService,) { }

  ngOnInit(): void {
    this.initialization()

  }

  private initialization(){
    this.subscription = this.activateRoute.params.subscribe(params => this.pizzaId = params['id']);
    this.loader = true;

    this.productsService.getPizzaById(this.pizzaId)
      .pipe(
        tap((pizza:Pizza[]) => {
          this.itemPizza = pizza[0]
        }),
        finalize(() => {
          this.loader = false
        }),
        catchError((err) =>  {
          throw 'Помилка сервера. Деталі: ' + err
        })
      )
      .subscribe()

    this.selectedPizzaSize = this.pizzaSize[0];
    this.pizzaDetailsSelectForm = new FormGroup({
      pizzaSelectSize: new FormControl(this.pizzaSize[0])
    })
  }

  public comeBack(){
    this.location.back()
  }

  public onSelectPizzaSize(size: any){
    const  param: SizeParam = size.key
    this.selectedPizzaWeight = this.itemPizza.params.weight[param]
    this.selectedPizzaPrice = this.itemPizza.params.price[param]
  }

  toShoppingCart(item: Pizza): void{

    const itemOrder: PizzaOrder = {
      ...item,
      orderId: 0,
      size: this.pizzaDetailsSelectForm.controls['pizzaSelectSize'].value.name,
      weight: this.selectedPizzaWeight ? this.selectedPizzaWeight : item.minWeight ,
      price: this.selectedPizzaPrice ? this.selectedPizzaPrice : item.minPrice,
      quantity: 1
    }

    this.shoppingService.create(itemOrder)

  }

}
