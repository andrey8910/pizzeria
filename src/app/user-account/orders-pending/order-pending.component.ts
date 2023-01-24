import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AuthorizationDialogData} from "../../core/interfaces/authorization-dialog";
import {OrdersService} from "../../core/services/orders.service";
import {UserAuthenticationCheckService} from "../../core/services/user-authentication-check.service";
import {takeUntil, tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-orders-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPendingComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

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

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  private getOrdersById(clientId: number){
    this.ordersService.getOrdersByClientId(clientId).pipe(
      tap(res => {
        this.ordersPending = [];
        this.ordersPending = res.filter(item => item.orderStatus === "в роботі");
        this.ordersPending.map((item: any) => {
          item.orderPrice = 0
          item.orderList.forEach((listItem:any) =>{
            listItem.idOrder = item.id
            this.productsService.getPizzaById(listItem.productId)
              .pipe(
                tap((product: any) => {
                  listItem.title = product[0].title;
                  product[0].params.forEach((param: any) => {
                    if(param.size == listItem.size.key) {
                      listItem.price = param.price;
                      item.orderPrice += listItem.price * listItem.quantity;
                    }
                  })
                  this.cdr.markForCheck();
                }),
                takeUntil(this.destroy$)
              ).subscribe()
          })
        })
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }


}
