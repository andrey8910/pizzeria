import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthenticationCheckService} from "../../../shared/services/user-authentication-check.service";
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {Observable} from "rxjs";
import {PizzaOrder} from "../../../shared/interfaces/pizza-order";
import {AuthorizationDialogData} from "../../../shared/interfaces/authorization-dialog";
import {tap} from "rxjs/operators";
import {Orders, ProductParametersForOrder} from "../../../shared/interfaces/orders";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  public authenticationData: AuthorizationDialogData
  public shoppingCart$: Observable<PizzaOrder[]> ;
  private userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public shoppingProductsList : PizzaOrder[]

  private newOrder : Orders
  private productsParametersForOrder : ProductParametersForOrder[] = []

  constructor(private shoppingService: ShoppingCartService,
              private userAuthCheckService: UserAuthenticationCheckService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init()
  }

  private init(){
    this.shoppingCart$ = this.shoppingService.shoppingCart$
    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$

    this.userAuthenticationCheck$.pipe(
      tap((res:AuthorizationDialogData) => {
        this.authenticationData = res
        this.cdr.markForCheck();
      })
    ).subscribe()

    this.shoppingCart$.pipe(
      tap((res: PizzaOrder[]) => {
        this.shoppingProductsList = res

        this.shoppingProductsList.forEach((item: PizzaOrder) => {
          const prodParamOrder : ProductParametersForOrder = {
            id : item.id,
            size: {
              name : item.size.name,
              key: item.size.key
            },
            quantity : item.quantity
          }
          this.productsParametersForOrder.push(prodParamOrder)
        })
      })
    ).subscribe()

  }

  public createOrder(){
    this.newOrder = {
      clientId : this.authenticationData.resultAuthentication.id,
      creationTime : new Date().getTime(),
      orderList : this.productsParametersForOrder,
      orderStatus : "створено"
    }
    console.log(this.newOrder)
  }

}
