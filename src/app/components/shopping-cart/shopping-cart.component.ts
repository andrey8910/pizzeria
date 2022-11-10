import { Component, OnInit, } from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Pizza } from "../../interfaces/pizza";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$: Observable<Pizza[]> ;
  public totalAmount: number;

  constructor(private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingService.loadAll();
    this.totalAmount = this.shoppingService.totalAmount;
    this.shoppingCart$ = this.shoppingService.shoppingCart$;


  }

  public deleteItem(itemId: number){
    this.shoppingService.delete(itemId);
    this.totalAmount = this.shoppingService.getTotalPrice()

  }

}
