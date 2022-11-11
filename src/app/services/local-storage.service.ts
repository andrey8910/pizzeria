import { Injectable } from '@angular/core';
import { PizzaOrder } from "../interfaces/pizza-order";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getLocalStorage(key: string):any{
    const ls: any = localStorage.getItem(key);
    return JSON.parse(ls);
  }
  public setLocalStorage(key: string, value: PizzaOrder[] | number){
    localStorage.setItem(key, JSON.stringify(value));
  }
  public removeLocalStorage(key: string): void{
    localStorage.removeItem(key);
  }
  public clearLocalStorage(): void{
    localStorage.clear();
  }
}
