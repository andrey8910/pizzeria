import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Orders} from "../interfaces/orders"


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  getOrdersAll(){
    return this.httpClient.get<Orders[]>(environment.urlOrdersAll)
  }

  addOrder(order: Orders){
    return this.httpClient.post<Orders>('http://localhost:3001/orders', order)
  }
}
