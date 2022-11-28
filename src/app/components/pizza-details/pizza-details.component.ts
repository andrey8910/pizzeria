import {Component, OnInit} from '@angular/core';
import {Pizza} from "../../interfaces/pizza";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {Subscription} from 'rxjs';
import {ProductsService} from "../../services/products.service";
import {catchError, finalize, tap} from "rxjs/operators";

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss']
})
export class PizzaDetailsComponent implements OnInit {
  public loader = false
  public itemPizza: Pizza
  public pizzaId: number
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute,
              private location: Location,
              private productsService : ProductsService) { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.subscription = this.activateRoute.params.subscribe(params => this.pizzaId = params['id']);
    this.loader = true;
    this.productsService.getPizzaById(this.pizzaId)
      .pipe(
        tap((pizza:Pizza[]) => {
          this.itemPizza = pizza[0]
        }),
        finalize(() => {
          this.loader = false
        }),
        catchError((err) =>  {
          throw 'Помилка сервера. Деталі: ' + err
        })



      )
      .subscribe()
  }

  public comeBack(){
    this.location.back()
  }

}
