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
  @Output() howManyItem = new EventEmitter<{quantity: number, price: number, plusOrMinus: string}>;
  public quantityInOrder: number = 1
  public multiplyAmount: number


  constructor() { }

  ngOnInit(): void {

  }

  deleteItem(item: PizzaOrder){
    this.delItem.emit(item)
  }

  changeQuantity(quantity: number, price: number, event: any){
    let plusOrMinus: string = ''
    if(quantity > 0){
      this.multiplyAmount = this.quantityInOrder
      if(event.originalEvent.target.classList.contains('pi-plus') || event.originalEvent.target.classList.contains('p-inputnumber-button-up') ){
        plusOrMinus = 'plus'
      }else if(event.originalEvent.target.classList.contains('pi-minus') || event.originalEvent.target.classList.contains('p-inputnumber-button-down')){
        plusOrMinus = 'minus'
      }

      this.howManyItem.emit({quantity,price, plusOrMinus})

    }else{
      return
    }
  }

}
