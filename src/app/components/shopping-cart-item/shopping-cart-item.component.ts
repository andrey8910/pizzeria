import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';
import { PizzaOrder } from "../../interfaces/pizza-order";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() itemShop: PizzaOrder
  @Output() delItem = new EventEmitter<{itemId: number, itemPrice: number}>;
  @Output() howManyItem = new EventEmitter<{quantity: number, price: number, orderId:number, plusOrMinus: string}>;
  public cartItemForm: FormGroup
  public quantityInOrder: number = 1

  constructor() { }

  ngOnInit(): void {

    this.cartItemForm = new FormGroup<any>({
      itemQuantity : new FormControl(1)
    })
    this.cartItemForm.get('itemQuantity')?.setValue(this.itemShop.quantity);
    this.quantityInOrder = this.itemShop.quantity

  }

  deleteItem(itemId: number, itemPrice: number){
    this.delItem.emit({itemId,itemPrice})
  }

  changeQuantity(quantity: number, price: number, orderId:number, event: any){

    let plusOrMinus: string = ''
    if(quantity > 0){
      this.quantityInOrder = this.cartItemForm.controls['itemQuantity'].value
      if(event.originalEvent.target.classList.contains('pi-plus') || event.originalEvent.target.classList.contains('p-inputnumber-button-up') ){
        plusOrMinus = 'plus'
      }else if(event.originalEvent.target.classList.contains('pi-minus') || event.originalEvent.target.classList.contains('p-inputnumber-button-down')){
        plusOrMinus = 'minus'
      }

      this.howManyItem.emit({quantity,price, orderId, plusOrMinus})

    }else{
      return
    }
  }

}
