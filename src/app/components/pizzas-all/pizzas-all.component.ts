import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Pizza } from '../../interfaces/pizza';
import {finalize, tap, catchError} from 'rxjs/operators';


@Component({
  selector: 'app-pizzas-all',
  templateUrl: './pizzas-all.component.html',
  styleUrls: ['./pizzas-all.component.scss']
})

export class PizzasAllComponent implements OnInit {

  public pizzas: Pizza[];
  public loader: boolean = false;
  public showErrorMassage: boolean = false
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getPizzas()
  }

  private getPizzas(){
    this.loader = true;
    this.productsService.getPizzas()
      .pipe(
        tap((data:Pizza[]) => {
          this.pizzas = data

        }),

        finalize(() => {
          this.loader = false
          this.pizzas.length == 0 ? this.showErrorMassage = true : this.showErrorMassage = false
        }),
        catchError((err) =>  {throw 'Помилка сервера. Деталі: ' + err})
      )
      .subscribe()
  }

}
