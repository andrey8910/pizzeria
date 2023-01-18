import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../core/services/orders.service";
import {Orders} from "../../core/interfaces/orders";
import {takeUntil, tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public orderId: number
  public order: Orders = {
     creationTime: 0,
     clientId: 0,
     orderList: [],
     orderStatus: "в роботі"
  }
  public orderNotFound = false
  public orderList: any[] = []

  public orderTotalPrice = 0

  constructor( private activateRoute: ActivatedRoute,
               private location: Location,
               private ordersService: OrdersService,
               private productsService : ProductsService,
               private cdr: ChangeDetectorRef,) { }

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
    this.activateRoute.params.subscribe(params => this.orderId = params['id']);

    this.ordersService.getOrderById(this.orderId)
      .pipe(
        tap((order:Orders[]) => {
          if(order.length > 0){
            this.orderNotFound = false
            this.order = order[0]
            order[0].orderList.forEach(item =>{
              let orderListItem: any = {
                productId: item.productId,
                title: '',
                quantity: item.quantity,
                size: item.size,
                weight: 0,
                sumPrice: 0
              }

              this.productsService.getPizzaById(item.productId).pipe(
                  tap((res: any) => {
                    if(res.length > 0){
                      orderListItem.title = res[0].title
                      //console.log(res[0].params.price)
                      res[0].params.price.forEach((price : any) => {
                        Object.entries(price).forEach(p => {
                          if(p[0] == orderListItem.size.key){
                            const orderPrice: any = p[1];
                            orderListItem.sumPrice = orderPrice * orderListItem.quantity;
                            this.cdr.markForCheck();
                          }
                        })
                      })

                      this.orderTotalPrice += orderListItem.sumPrice

                      res[0].params.weight.forEach((weight : any) => {
                        Object.entries(weight).forEach(w => {
                          if(w[0] == orderListItem.size.key){
                            orderListItem.weight = w[1];
                            this.cdr.markForCheck();
                          }
                        })
                      })
                      this.orderList.push(orderListItem)
                      this.cdr.markForCheck();
                    }
                  }),
                takeUntil(this.destroy$)
                ).subscribe()
            })
            this.cdr.markForCheck();
          }else{
            this.orderNotFound = true
            this.cdr.markForCheck();
          }
        }),
        takeUntil(this.destroy$)
      ).subscribe()
  }

}
