import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../interfaces/pizza';
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
    }
    this.shoppingSubject.next(this.shoppingList)
  }

  create(item: Pizza){

  const itemOrder: PizzaOrder = {
      id: 0,
      image: '',
      title: '',
      ingredients: [],
      size: '',
      weight: 0,
      price: 0

    }

    itemOrder.id = ++this.nextId
    itemOrder.title = item.title
    itemOrder.image = item.imageMain
    itemOrder.ingredients = item.ingredients


    this.shoppingList.push(itemOrder);

    this.totalAmount = this.shoppingList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    )
    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage('shoppingList', this.shoppingList);
    this.localSService.setLocalStorage('totalPrice', this.totalAmount)
  }


  delete(itemShop: PizzaOrder){

    this.shoppingList.forEach((item:PizzaOrder, index:number) => {
      if(item.id == itemShop.id){
        this.totalAmount -= itemShop.price
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
}
