import {Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {  FormGroup, FormControl } from '@angular/forms';
import { ShoppingCartService } from "../core/services/shopping-cart.service";
import {Pizza, SizeModel} from "../core/interfaces/pizza";
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
      this.pizzaItem.params.forEach((param: SizeModel) => {
        if(param.size){
          const size = {
                  name : param.title,
                  key: param.size
                }
          this.pizzaSize.push(size);
        }
      })
      this.selectedPizzaSize = this.pizzaSize.filter((item : any) => {return item.key == "small"})[0];
      this.pizzaParamsSelectForm = new FormGroup({
        pizzaSelectSize: new FormControl(this.selectedPizzaSize)
      })
    }
    this.cdr.markForCheck();
  }

  onSelectPizzaSize(event: any){

    const  sizeParam: SizeParam = event.key;
    this.pizzaItem.params.forEach((param:SizeModel) => {
      if(param.size == sizeParam){
        this.selectedPizzaPrice = param.price;
        this.selectedPizzaWeight = param.weight;
      }
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
