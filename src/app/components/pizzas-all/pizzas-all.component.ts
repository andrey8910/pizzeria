import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Pizza } from '../../interfaces/pizza';


@Component({
  selector: 'app-pizzas-all',
  templateUrl: './pizzas-all.component.html',
  styleUrls: ['./pizzas-all.component.scss']
})

export class PizzasAllComponent implements OnInit {

  public pizzas: Pizza[]

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    this.productsService.getPizzas().subscribe((data:Pizza[]) => {
      this.pizzas = data
    })
    setTimeout(() => {
      console.log(this.pizzas)
    },1000)
  }

}
