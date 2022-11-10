import { Injectable } from '@angular/core';
import { Pizza } from "../interfaces/pizza";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getLocalStorage(key: string):any{
    const ls: any = localStorage.getItem(key);
    return JSON.parse(ls);
  }
  public setLocalStorage(key: string, value: Pizza[] | number){
    localStorage.setItem(key, JSON.stringify(value));
  }
  public removeLocalStorage(key: string): void{
    localStorage.removeItem(key);
  }
  public clearLocalStorage(): void{
    localStorage.clear();
  }
}
