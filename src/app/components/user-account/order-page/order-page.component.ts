import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../../shared/services/orders.service";
import {Orders} from "../../../shared/interfaces/orders";
import {tap} from "rxjs/operators";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent implements OnInit {

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

  private subscription: Subscription;


  constructor( private activateRoute: ActivatedRoute,
               private location: Location,
               private ordersService: OrdersService,
               private productsService : ProductsService,
               private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.init()
  }

  public comeBack(){
    this.location.back()
  }

  private init(){
    this.subscription = this.activateRoute.params.subscribe(params => this.orderId = params['id']);

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

              this.productsService.getPizzaById(item.productId)
                .pipe(
                  tap((res: any) => {
                    if(res.length > 0){
                      orderListItem.title = res[0].title
                      orderListItem.sumPrice = res[0].params.price[orderListItem.size.key] * orderListItem.quantity
                      this.orderTotalPrice += orderListItem.sumPrice
                      orderListItem.weight = res[0].params.weight[orderListItem.size.key]

                      this.orderList.push(orderListItem)
                      this.cdr.markForCheck();
                    }

                  })
                ).subscribe()
            })
            this.cdr.markForCheck();
          }else{
            this.orderNotFound = true
            this.cdr.markForCheck();
          }
        })
      ).subscribe()
  }

}
