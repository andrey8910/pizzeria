import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PizzaOrder } from '../interfaces/pizza-order'
import { LocalStorageService } from './local-storage.service';
import {MessageService} from 'primeng/api';
import {LocalStorageKeys} from '../local-storage-keys'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingSubject = new BehaviorSubject<PizzaOrder[]>([]);
  readonly shoppingCart$ = this.shoppingSubject.asObservable();
  private shoppingList: PizzaOrder[] = [];
  public totalAmount: number;
  private nextId: number = 0;



  constructor(
    private localSService: LocalStorageService,
    private messageService: MessageService
    ) { }

  loadAll(){

    if(localStorage.getItem(LocalStorageKeys.ShoppingList) !== null){
      this.shoppingList = this.localSService.getLocalStorage(LocalStorageKeys.ShoppingList);
      this.totalAmount = this.localSService.getLocalStorage(LocalStorageKeys.TotalPrice)
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
    this.localSService.setLocalStorage(LocalStorageKeys.ShoppingList, this.shoppingList);
    this.localSService.setLocalStorage(LocalStorageKeys.TotalPrice, this.totalAmount);
    this.showSuccessAddItem(itemOrder.title)

  }

  showSuccessAddItem(title: string) {
    this.messageService.add({severity:'success', summary: `${title}`, detail: 'Товар додано до кошика !'});
  }

  delete(itemId: number, sumPriceItem: number){

    this.shoppingList.forEach((item:PizzaOrder, index:number) => {
      if(item.orderId == itemId){
        this.totalAmount -= sumPriceItem
        this.shoppingList.splice(index, 1);
        this.showWarnDeleteItem(item.title)
      }
    })

    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage(LocalStorageKeys.ShoppingList, this.shoppingList);
    this.localSService.setLocalStorage(LocalStorageKeys.TotalPrice, this.totalAmount);

  }

  showWarnDeleteItem(title: string) {
    this.messageService.add({severity:'warn', summary: `${title}`, detail: 'Товар видалено із кошика !'});
  }

  getTotalPrice(){
    return this.localSService.getLocalStorage(LocalStorageKeys.TotalPrice)
  }

  quantityInOneItem(quantity: number, price: number, orderId:number, plusOrMinus: string){

    plusOrMinus === 'plus' ?  this.totalAmount += price : this.totalAmount -= price

   this.shoppingList.forEach((item:PizzaOrder) => {
     if(item.orderId == orderId){
       item.quantity = quantity
     }
   })
    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage(LocalStorageKeys.ShoppingList, this.shoppingList);
    this.localSService.setLocalStorage(LocalStorageKeys.TotalPrice, this.totalAmount)

  }
}
