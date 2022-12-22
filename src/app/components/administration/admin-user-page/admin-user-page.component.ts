import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {UsersService} from "../../../shared/services/users.service";
import {tap} from "rxjs/operators";
import {Users} from "../../../shared/interfaces/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passEqual, ValidateLogin, ValidatePass, ValidatePassConfirm} from "../../../shared/Validators";
import {OrdersService} from "../../../shared/services/orders.service";
import {Orders} from "../../../shared/interfaces/orders";
import {ProductsService} from "../../../shared/services/products.service";


@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserPageComponent implements OnInit {
  public isEdit = false
  public hidePass = true
  public hideConfirmPass = true
  public readyOrdersList = false
  public userId: number
  public userData: Users
  public userOrders: Orders[]
  public userOrdersUnitedProducts: any[] = []
  public loader = false
  private subscription: Subscription;

  public formEditUserData: FormGroup;

  constructor(
              private activateRoute: ActivatedRoute,
              private location: Location,
              private usersService: UsersService,
              private ordersService: OrdersService,
              private productsService: ProductsService,
              private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.initialization()
  }

  private initialization(){
    this.subscription = this.activateRoute.params.subscribe(params => this.userId = params['id']);
    if(this.userId){
      this.getUserData()
      this.createFormEditUserData()
      this.getUserOrders()
    }

  }

  private getUserData(){
    this.usersService.getUserById(this.userId).pipe(
      tap( (res:Users) => {
        this.userData = res
        this.loader = true;
        this.cdr.markForCheck();
      })
    ).subscribe()
  }

  private createFormEditUserData(){
    this.formEditUserData = new FormGroup<any>({
      name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(12)]),
      login: new FormControl('', [Validators.required, ValidateLogin]),
      password: new FormControl('', [Validators.required, ValidatePass]),
      confirmPassword: new FormControl('', [Validators.required, ValidatePassConfirm])
    }, passEqual('password', 'confirmPassword'))

    this.cdr.markForCheck();

  }



  private getUserOrders(){
    this.ordersService.getOrdersByClientId(this.userId).pipe(
      tap((res:Orders[]) => {
        this.readyOrdersList = false
        if(res.length > 0){
          this.userOrders = res
          this.getProductDataForOrderList()
        }
      })
    ).subscribe()
  }

  private getProductDataForOrderList(){
    if(this.userOrders.length > 0){
      this.userOrders.forEach((order : Orders) => {
        let orderChange: any = {
          orderNumber : order.id,
          createTime: order.creationTime,
          status : order.orderStatus,
          productList: [],
          orderPrice: 0

        }
        order.orderList.map(listItem => {
          let productListItem: any = {
            productId: listItem.productId,
            quantity: listItem.quantity,
            size: listItem.size,
            title: '',
            price: 0,
            params: {}
          }

          this.productsService.getPizzaById(listItem.productId).pipe(
            tap((res:any[]) => {
              productListItem.title = res[0].title
              productListItem.price = res[0].params.price[productListItem.size.key] * productListItem.quantity
              productListItem.params = res[0].params
              orderChange.orderPrice += productListItem.price
              this.cdr.markForCheck();
            })
          ).subscribe()
          orderChange.productList.push(productListItem)
        })
        this.userOrdersUnitedProducts.push(orderChange)
      })
    }
    this.readyOrdersList = true
    this.cdr.markForCheck();
  }

  public onNoClick(){
    this.formEditUserData.reset()
    this.isEdit = false
    this.cdr.markForCheck();
  }

  public saveChangeUserData(){
    let newDataUser = {
      name: this.formEditUserData.controls['name'].value,
      login: this.formEditUserData.controls['login'].value,
      password: this.formEditUserData.controls['password'].value
    }
    this.usersService.editUser(newDataUser, this.userId).pipe(
      tap(res => {
        this.userData = res
        this.cdr.markForCheck();
      })
    ).subscribe()
    this.formEditUserData.reset()
    this.cdr.markForCheck();
  }

  public comeBack(){
    this.location.back()
  }

}
