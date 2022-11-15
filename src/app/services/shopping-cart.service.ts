import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PizzaOrder } from '../interfaces/pizza-order'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingSubject = new BehaviorSubject<PizzaOrder[]>([]);
  readonly shoppingCart$ = this.shoppingSubject.asObservable();
  private shoppingList: PizzaOrder[] = [];
  public totalAmount: number;
  private nextId: number = 0;


  constructor(private localSService: LocalStorageService) { }

  loadAll(){

    if(localStorage.getItem('shoppingList') !== null){
      this.shoppingList = this.localSService.getLocalStorage('shoppingList');
      this.totalAmount = this.localSService.getLocalStorage('totalPrice')
      this.shoppingSubject.next(this.shoppingList);
    }else {
      this.shoppingList =[];
      this.totalAmount = 0;
    }
    this.shoppingSubject.next(this.shoppingList)
  }

  create(item: PizzaOrder){

  const itemOrder: PizzaOrder = {
     ...item,
    orderId : ++this.nextId,
    quantity : 1
  }
    this.shoppingList.push(itemOrder);

    this.totalAmount = this.shoppingList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    )
    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage('shoppingList', this.shoppingList);
    this.localSService.setLocalStorage('totalPrice', this.totalAmount)
  }


  delete(itemId: number, itemPrice: number){

    this.shoppingList.forEach((item:PizzaOrder, index:number) => {
      if(item.id == itemId){
        this.totalAmount -= itemPrice
        this.shoppingList.splice(index, 1);
      }
    })

    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage('shoppingList', this.shoppingList);
    this.localSService.setLocalStorage('totalPrice', this.totalAmount)
  }

  getTotalPrice(){
    return this.localSService.getLocalStorage('totalPrice')
  }

  quantityInOneItem(quantity: number, price: number, orderId:number, plusOrMinus: string){
    if(plusOrMinus === 'plus'){
      this.totalAmount += price
    }else if(plusOrMinus === 'minus'){
      this.totalAmount -= price
    }

   this.shoppingList.forEach((item:PizzaOrder) => {
     if(item.orderId == orderId){
       item.quantity = quantity
     }
   })
    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage('shoppingList', this.shoppingList);
    this.localSService.setLocalStorage('totalPrice', this.totalAmount)

  }
}
