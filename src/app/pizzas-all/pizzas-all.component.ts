import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { Pizza } from '../core/interfaces/pizza';
import {finalize, tap, catchError, takeUntil} from 'rxjs/operators';
import {LegacyPageEvent as PageEvent} from "@angular/material/legacy-paginator";
import {Subject} from "rxjs";



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
  public pageSizePagination: number = 12

  private destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getPizzas()
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getPizzas(){
    this.loader = true;
    this.productsService.getPizzas()
      .pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data.slice(0, this.pageSizePagination);
          this.cdr.markForCheck()
        }),
        finalize(() => {
          this.loader = false
          this.pizzas.length == 0 ? this.showErrorMassage = true : this.showErrorMassage = false
        }),
        catchError((err) =>  {
          this.showProductsNotFound = true
          throw 'Помилка сервера. Деталі: ' + err
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  public searchPizzaDB(event: any){
    this.productsService.findPizza(event.target.value)
      .pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data.slice(0, this.pageSizePagination);
          this.searchTextBD = event.target.value;
          this.cdr.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  public toSortPizzas(){
    if(this.valueSortingMethod.sortBy === 'price'){
      this.productsService.sortByPrice(this.valueSortingMethod.code)
        ?.pipe(
          tap((data:Pizza[]) => {
            this.pizzas = data.slice(0, this.pageSizePagination);
            this.cdr.markForCheck();
          }),
          takeUntil(this.destroy$)
          ).subscribe()
    }
  }

  public changePaginator(event: PageEvent){
    this.productsService.getPizzaFromPagination(event)
      .pipe(
        tap((data: Pizza[]) => {
          this.pizzas = data;
          this.pageSizePagination = event.pageSize;
          this.cdr.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

}
