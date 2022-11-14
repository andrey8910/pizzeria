import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PizzaOrder } from "../../interfaces/pizza-order";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() itemShop: PizzaOrder
  @Output() delItem = new EventEmitter<PizzaOrder>;
  public quantityInOrder: number = 1
  public multiplyAmount: number
  constructor() { }

  ngOnInit(): void {

  }

  deleteItem(item: PizzaOrder){
    this.delItem.emit(item)
  }

  changeQuantity(event: Event){
    if(this.quantityInOrder > 0){
      this.multiplyAmount = this.quantityInOrder
    }
  }

}
