import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../core/services/orders.service";
import {Orders} from "../../core/interfaces/orders";
import {takeUntil, tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";
import {SizeModel} from "../../core/interfaces/pizza";

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
                      res[0].params.forEach((param : SizeModel) => {
                        if(param.size == orderListItem.size.key){
                          orderListItem.sumPrice = param.price * orderListItem.quantity;
                          orderListItem.weight = param.weight;
                          this.cdr.markForCheck();
                        }
                      })
                      this.orderTotalPrice += orderListItem.sumPrice
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
