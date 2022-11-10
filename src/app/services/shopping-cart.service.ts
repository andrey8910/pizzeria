import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../interfaces/pizza';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingSubject = new BehaviorSubject<Pizza[]>([]);
  readonly shoppingCart$ = this.shoppingSubject.asObservable();
  private shoppingList: Pizza[] = [];
  public totalAmount: number;

  constructor(private localSService: LocalStorageService) { }

  loadAll(){
    if(localStorage.getItem('shoppingList') !== null){
      this.shoppingList = this.localSService.getLocalStorage('shoppingList');
      this.totalAmount = this.localSService.getLocalStorage('totalPrice')
      this.shoppingSubject.next(this.shoppingList);
      this.totalAmount = this.localSService.getLocalStorage('totalPrice');

    }else {
      this.shoppingList =[];

    }

    this.shoppingSubject.next(this.shoppingList)
  }

  create(item: Pizza){
    this.shoppingList.push(item);
    this.totalAmount += item.minPrice
    this.shoppingSubject.next(Object.assign([],this.shoppingList));
    this.localSService.setLocalStorage('shoppingList', this.shoppingList);
    this.localSService.setLocalStorage('totalPrice', this.totalAmount)
  }

  delete(itemId: number){
    this.shoppingList.forEach((item:Pizza, index:number) => {
      if(item.id == itemId){
        this.totalAmount -= item.minPrice
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
