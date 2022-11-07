import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pizza } from '../interfaces/pizza';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getPizzas(){
    return this.httpClient.get<Pizza[]>('http://localhost:3001/pizza')
  }

}
