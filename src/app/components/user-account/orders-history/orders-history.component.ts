import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {OrdersService} from "../../../shared/services/orders.service";
import {UserAuthenticationCheckService} from "../../../shared/services/user-authentication-check.service";
import {Orders} from "../../../shared/interfaces/orders";
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../../shared/interfaces/authorization-dialog";
import {tap} from "rxjs/operators";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersHistoryComponent implements OnInit {

  public ordersAll: any[]
  public readyOrdersList = false
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultAuth: AuthorizationDialogData;

  constructor(private ordersService: OrdersService,
              private userAuthCheckService: UserAuthenticationCheckService,
              private productsService: ProductsService,
              private location: Location,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init()
  }

  private init(){

    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$
    this.userAuthenticationCheck$.pipe(
      tap((res:AuthorizationDialogData) => {
        this.resultAuth = res
        if(this.resultAuth.isPassedAuthentication){
          this.getOrderByClientId(res.resultAuthentication.id)
        }
      })
    ).subscribe()

  }

  public getOrderByClientId(clientId: number){
    this.ordersService.getOrdersByClientId(clientId).pipe(
      tap((res:Orders[]) => {
        if(res.length > 0){
          this.ordersAll = res
          this.ordersAll.map((item) => {
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
          this.readyOrdersList = true
        }else{
          this.readyOrdersList = false
        }
      })
    ).subscribe()
  }

  public comeBack(){
    this.location.back()
  }

  public test(){

    this.cdr.markForCheck();
  }
}
