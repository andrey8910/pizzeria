import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../core/interfaces/authorization-dialog";
import {OrdersService} from "../../core/services/orders.service";
import {UserAuthenticationCheckService} from "../../core/services/user-authentication-check.service";
import {tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-orders-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPendingComponent implements OnInit {

  public ordersPending: any[] = []
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultAuth: AuthorizationDialogData;

  constructor( private ordersService: OrdersService,
               private userAuthCheckService: UserAuthenticationCheckService,
               private productsService: ProductsService,
               private location: Location,
               private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init()
  }

  public comeBack(){
    this.location.back()
  }

  private init(){
    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$
    this.userAuthenticationCheck$.pipe(

      tap(res => {
        this.resultAuth = res

        if(res.isPassedAuthentication){
          this.getOrdersById(this.resultAuth.resultAuthentication.id)
        }
      })
    ).subscribe()
  }

  private getOrdersById(clientId: number){
    this.ordersService.getOrdersByClientId(clientId).pipe(
      tap(res => {

        this.ordersPending = []

        this.ordersPending = res.filter(item => item.orderStatus === "в роботі")

        this.ordersPending.map((item: any) => {
          item.orderPrice = 0
          item.orderList.forEach((listItem:any) =>{
            listItem.idOrder = item.id

            this.productsService.getPizzaById(listItem.productId)
              .pipe(
                tap((product: any) => {
                  listItem.title = product[0].title
                  listItem.price = product[0].params.price[listItem.size.key]
                  item.orderPrice += listItem.price * listItem.quantity
                  this.cdr.markForCheck();
                })
              ).subscribe()
          })
        })
      })
    ).subscribe()
  }


}
