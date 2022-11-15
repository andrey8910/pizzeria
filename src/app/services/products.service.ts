import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pizza } from '../interfaces/pizza';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getPizzas(){
    return this.httpClient.get<Pizza[]>(environment.urlPizzaAll)

  }

}
