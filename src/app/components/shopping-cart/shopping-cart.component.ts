import { Component, OnInit, } from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { PizzaOrder } from "../../interfaces/pizza-order";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$: Observable<PizzaOrder[]> ;
  public totalAmount: number;
  public quantityInOrder: number = 1;

  constructor(private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingService.loadAll();

    if(localStorage.getItem("totalPrice") !==null ){
      this.totalAmount = this.shoppingService.getTotalPrice()
    }else{this.totalAmount = this.shoppingService.totalAmount}

    this.shoppingCart$ = this.shoppingService.shoppingCart$;
  }

  public deleteItem(item: PizzaOrder){
    this.shoppingService.delete(item);
    this.totalAmount = this.shoppingService.totalAmount
  }

  public changeQuantity(event: Event){
    if(this.quantityInOrder > 0){
      console.log(event)
    }else{
      return
    }

  }

}
