import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../interfaces/pizza';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingSubject = new BehaviorSubject<Pizza[]>([]);
  readonly shoppingCart$ = this.shoppingSubject.asObservable();
  private shoppingList: Pizza[] = [];

  constructor() { }

  loadAll(){
    this.shoppingSubject.next(this.shoppingList)
  }

  create(item: Pizza){
    this.shoppingList.push(item);
    this.shoppingSubject.next(Object.assign([],this.shoppingList));
  }

  delete(itemId: number){
    this.shoppingList.forEach((item:Pizza, index:number) => {
      if(item.id == itemId){
        this.shoppingList.splice(index, 1)

      }
    })
    this.shoppingSubject.next(Object.assign([],this.shoppingList));

  }
}
