import {Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {  FormGroup, FormControl } from '@angular/forms';
import { ShoppingCartService } from "../core/services/shopping-cart.service";
import {Pizza} from "../core/interfaces/pizza";
import {PizzaOrder } from "../core/interfaces/pizza-order";
import { SizeParam } from '../core/interfaces/size-param'

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaCardComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() pizzaItem: Pizza

  private shoppingCart$: Observable<PizzaOrder[]>;
  public pizzaParamsSelectForm: FormGroup;
  public pizzaSize: any = [];

  public selectedPizzaSize: any
  public selectedPizzaWeight: number;
  public selectedPizzaPrice: number;

  constructor(
    private shoppingService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init()
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private init(){
    this.shoppingCart$ = this.shoppingService.shoppingCart$;
    this.shoppingService.loadAll();
    if(this.pizzaItem){
      this.pizzaItem.params.size.forEach( value =>{
        Object.entries(value).forEach(s => {
          const size = {
            name : s[1],
            key: s[0]
          }
          this.pizzaSize.push(size)
        })
      })
      this.pizzaParamsSelectForm = new FormGroup({
        pizzaSelectSize: new FormControl(this.pizzaSize[0])
      })
    }
    this.cdr.markForCheck();
  }

  onSelectPizzaSize(event: any){
  const  sizeParam: SizeParam = event.key;
  this.pizzaItem.params.price.forEach(param => {
    Object.entries(param).forEach(p => {
      if(p[0] == sizeParam){
        this.selectedPizzaPrice = p[1]
      }
    })
  });
    this.pizzaItem.params.weight.forEach(param => {
      Object.entries(param).forEach(p => {
        if(p[0] == sizeParam){
          this.selectedPizzaWeight = p[1]
        }
      })
    })

    this.cdr.markForCheck();
  }

  toShoppingCart(item: Pizza): void{
    const itemOrder: PizzaOrder = {
      ...item,
      orderId: 0,
      size: {
        name: this.pizzaParamsSelectForm.controls['pizzaSelectSize'].value.name,
        key: this.pizzaParamsSelectForm.controls['pizzaSelectSize'].value.key,
      },
      weight: this.selectedPizzaWeight ? this.selectedPizzaWeight : item.minWeight ,
      price: this.selectedPizzaPrice ? this.selectedPizzaPrice : item.minPrice,
      quantity: 1
    }
    this.shoppingService.create(itemOrder)
  }

}
