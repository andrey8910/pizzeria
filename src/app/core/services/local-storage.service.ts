import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getLocalStorage(key: string):any{
    const ls: any = localStorage.getItem(key);
    return JSON.parse(ls);
  }
  public setLocalStorage<T>(key: string, value: T){
    localStorage.setItem(key, JSON.stringify(value));
  }
  public removeLocalStorage(key: string): void{
    localStorage.removeItem(key);
  }
  public clearLocalStorage(): void{
    localStorage.clear();
  }
}
