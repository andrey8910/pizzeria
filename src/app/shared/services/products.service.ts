import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pizza } from '../interfaces/pizza';
import {environment} from "../../../environments/environment";
import {PageEvent} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getPizzas(){
    return this.httpClient.get<Pizza[]>(environment.urlPizzaAll)
  }

  public getPizzaById(id:number){
    return this.httpClient.get<Pizza[]>(`${environment.urlPizzaAll}?id=${id}`)
  }

  public getPizzaFromPagination(event: PageEvent){
    return this.httpClient.get<Pizza[]>(`${environment.urlPizzaAll}?_page=${event.pageIndex + 1}&_limit=${event.pageSize}`)
  }

  public findPizza(searchText: string){
    return this.httpClient.get<Pizza[]>(`${environment.urlPizzaAll}?q=${searchText}`)
  }

  public sortByPrice(sortParam: string){
    return  this.httpClient.get<Pizza[]>(`${environment.urlPizzaAll}?_sort=minPrice&_order=${sortParam}`)
  }

}
