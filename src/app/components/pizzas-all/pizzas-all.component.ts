import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Pizza } from '../../interfaces/pizza';
import {finalize, tap, catchError} from 'rxjs/operators';
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-pizzas-all',
  templateUrl: './pizzas-all.component.html',
  styleUrls: ['./pizzas-all.component.scss']
})

export class PizzasAllComponent implements OnInit {
  public searchText: string
  public searchTextBD: string = '';
  public sortingMethod = [
    {name: 'Ціна низька - висока', code: 'LH'},
    {name: 'Ціна висока - низька', code: 'HL'},
  ];
  public valueSortingMethod: any

  public pizzas: Pizza[];
  public loader: boolean = false;
  public showErrorMassage: boolean = false
  public showProductsNotFound: boolean = false
  public pageSizePagination: number = 6


  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getPizzas()
  }

  private getPizzas(){
    this.loader = true;
    this.productsService.getPizzas()
      .pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data.slice(0, this.pageSizePagination)
        }),
        finalize(() => {
          this.loader = false
          this.pizzas.length == 0 ? this.showErrorMassage = true : this.showErrorMassage = false
        }),
        catchError((err) =>  {
          this.showProductsNotFound = true
          throw 'Помилка сервера. Деталі: ' + err
        })
      )
      .subscribe()
  }

  public searchPizzaDB(event: any){
    this.productsService.findPizza(event.target.value)
      .pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data.slice(0, this.pageSizePagination)
          this.searchTextBD = event.target.value
        })
      )
      .subscribe()

  }

  public toSortPizzas(){
    this.productsService.sortPizza(this.valueSortingMethod.code)
      ?.pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data.slice(0, this.pageSizePagination)
        })
      )
      .subscribe()

  }

  public changePaginator(event: PageEvent){
    this.productsService.getPizzaFromPagination(event)
      .pipe(
        tap((data: Pizza[]) => {
          this.pizzas = data
          this.pageSizePagination = event.pageSize
        })
      )
      .subscribe()
  }
}
