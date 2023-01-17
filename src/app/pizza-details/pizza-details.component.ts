import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Pizza} from "../core/interfaces/pizza";
import {ActivatedRoute} from "@angular/router";
import {Location, ViewportScroller} from '@angular/common';
import { Subject, Subscription} from 'rxjs';
import {ProductsService} from "../core/services/products.service";
import {catchError, finalize, takeUntil, tap} from "rxjs/operators";
import {FormGroup, FormControl } from '@angular/forms';
import {SizeParam} from "../core/interfaces/size-param";
import {PizzaOrder} from "../core/interfaces/pizza-order";
import {ShoppingCartService} from "../core/services/shopping-cart.service";
import {ScrollTopService} from "../core/services/scroll-top.service";
import {WINDOW} from "../core/window";

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

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
              private shoppingService: ShoppingCartService,
              private scrollTopService: ScrollTopService,
              @Inject(WINDOW) private window: Window,
              private viewportScroller: ViewportScroller,
              ) { }

  ngOnInit(): void {
    this.initialization()

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.scrollTopService.visible = false
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
        }),
        takeUntil(this.destroy$),
      )
      .subscribe()

    this.selectedPizzaSize = this.pizzaSize[0];
    this.pizzaDetailsSelectForm = new FormGroup({
      pizzaSelectSize: new FormControl(this.pizzaSize[0])
    })

    this.handleScroll()
  }

  private handleScroll(){
    this.scrollTopService.handleScroll()?.pipe(
      tap(() => {
        (this.viewportScroller.getScrollPosition()[1] > 300) ? this.scrollTopService.visible = true : this.scrollTopService.visible = false
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public comeBack(){
    this.location.back()
  }

  public onSelectPizzaSize(size: any){
    const  param: SizeParam = size.key
    //this.selectedPizzaWeight = this.itemPizza.params.weight[param]
   // this.selectedPizzaPrice = this.itemPizza.params.price[param]
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
