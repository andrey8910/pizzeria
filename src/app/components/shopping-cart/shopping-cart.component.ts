import {ChangeDetectionStrategy, Component, OnInit,} from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import { PizzaOrder } from "../../shared/interfaces/pizza-order";
import {UserAuthenticationCheckService} from "../../shared/services/user-authentication-check.service";
import {AuthorizationDialogData} from "../../shared/interfaces/authorization-dialog";



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCart$: Observable<PizzaOrder[]> ;
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public totalAmount: number;
  public quantityInOrder: number = 1;


  constructor(private shoppingService: ShoppingCartService,
              private userAuthCheckService: UserAuthenticationCheckService) { }

  ngOnInit(): void {
    this.init()
  }
  private init(){
    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$

    if(localStorage.getItem("totalPrice") !==null ){
      this.totalAmount = this.shoppingService.getTotalPrice()
    }else{this.totalAmount = this.shoppingService.totalAmount}

    this.shoppingCart$ = this.shoppingService.shoppingCart$;

  }

  public deleteItem(item: {itemId: number, sumPriceItem: number, itemQuantity: number}){
    this.shoppingService.delete(item.itemId, item.sumPriceItem);
    this.totalAmount = this.shoppingService.totalAmount
  }

  public changeQuantity(item:{quantity: number, price: number, orderId:number, plusOrMinus: string}){

    this.shoppingService.quantityInOneItem(item.quantity, item.price, item.orderId, item.plusOrMinus)
    this.totalAmount = this.shoppingService.totalAmount

  }

}
