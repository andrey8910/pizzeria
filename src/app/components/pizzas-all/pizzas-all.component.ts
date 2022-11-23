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
  public sortingMethod = [
    {name: 'Ціна низька - висока', code: 'LH'},
    {name: 'Ціна висока - низька', code: 'HL'},
  ];
  public valueSortingMethod: any

  public pizzas: Pizza[];
  public loader: boolean = false;
  public showErrorMassage: boolean = false
  public showProductsNotFound: boolean = false


  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getPizzas()
  }

  private getPizzas(){
    this.loader = true;
    this.productsService.getPizzas()
      .pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data.slice(0,6)
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

  public toSortPizzas(){
    switch (this.valueSortingMethod.code){
      case 'LH':
        this.pizzas.sort((a,b) => a.minPrice - b.minPrice);
        break;

      case 'HL':
        this.pizzas.sort((a,b) => b.minPrice - a.minPrice)
    }


  }

  public changePaginator(event: PageEvent){
    this.productsService.getPizzaFromPagination(event)
      .pipe(
        tap((data: Pizza[]) => {
          this.pizzas = data
        })
      )
      .subscribe()
  }
}
