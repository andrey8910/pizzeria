import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Pizza } from '../../shared/interfaces/pizza';
import {finalize, tap, catchError} from 'rxjs/operators';
import {PageEvent} from "@angular/material/paginator";



@Component({
  selector: 'app-pizzas-all',
  templateUrl: './pizzas-all.component.html',
  styleUrls: ['./pizzas-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PizzasAllComponent implements OnInit {
  public searchText: string
  public searchTextBD: string = '';
  public sortingMethod = [
    {name: 'Ціна низька - висока', sortBy: 'price', code: 'asc'},
    {name: 'Ціна висока - низька', sortBy: 'price', code: 'desc'},
  ];
  public valueSortingMethod: any

  public pizzas: Pizza[];
  public loader = false;
  public showErrorMassage = false
  public showProductsNotFound = false
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
    if(this.valueSortingMethod.sortBy === 'price'){
      this.productsService.sortByPrice(this.valueSortingMethod.code)
        ?.pipe(
          tap((data:Pizza[]) => {
            this.pizzas = data.slice(0, this.pageSizePagination)
          })).subscribe()
    }
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
