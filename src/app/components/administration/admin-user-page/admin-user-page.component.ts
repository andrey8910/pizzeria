import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit, Renderer2
} from '@angular/core';
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

export class AdminUserPageComponent implements OnInit, AfterViewInit, AfterViewChecked , AfterContentChecked, AfterContentInit{
  public isEdit = false
  public hidePass = true
  public hideConfirmPass = true
  public readyOrdersList = false
  public userId: number
  public userData: Users
  public userOrders: Orders[] = []
  public userOrdersUnitedProducts: any[] = []
  public loader = false
  private nextPage = 2
  private subscription: Subscription;

  public formEditUserData: FormGroup;

  public infiniteObserver = new IntersectionObserver(
    ([entry], observer) =>{
      if(entry.isIntersecting){
        observer.unobserve(entry.target)
        this.getUserOrders(this.nextPage++)
        this.cdr.markForCheck()
      }
    },
    {
      threshold: 0.5
    }
  )


  constructor(
              private activateRoute: ActivatedRoute,
              private location: Location,
              private usersService: UsersService,
              private ordersService: OrdersService,
              private productsService: ProductsService,
              private elementRef: ElementRef,
              private cdr: ChangeDetectorRef,
              private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.initialization()
  }
  ngAfterContentChecked(){

  }
  ngAfterViewInit() {

  }

  ngAfterContentInit(){

  }
  ngAfterViewChecked(){

  }

  private initialization(){
    this.subscription = this.activateRoute.params.subscribe(params => this.userId = params['id']);
    if(this.userId){
      this.getUserData()
      this.createFormEditUserData()
      this.getUserOrders()
    }

      // const lastOrder: any = this.elementRef.nativeElement.querySelector('p-table tr.table-order:last-child')
      // const observer = new MutationObserver((mutations:any) => {
      //   mutations.forEach((mutation:any) => console.log(mutation));
      // });
      // observer.observe(lastOrder, {
      //   attributes: true,
      // });
      //
      // if(lastOrder){
      //
      //   this.infiniteObserver.observe(lastOrder)
      //   this.cdr.markForCheck();
      // }

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



  private getUserOrders(page = 1){
    this.ordersService.getOrdersByClientIdPageByPage(3, page, this.userId).pipe(
      tap((res:Orders[]) => {
        this.readyOrdersList = false
        if(res.length > 0){
          this.userOrders.push(...res)
          this.cdr.markForCheck();
          this.getProductDataForOrderList()

          console.log(res, 'res')
          setTimeout(() => {
            const lastOrder: any = this.elementRef.nativeElement.querySelectorAll('p-table tr.table-order:last-child').item(0)
            if(lastOrder){
              this.infiniteObserver.observe(lastOrder)
              //this.cdr.markForCheck();
            }
          }, 1000);
        }
      })
    ).subscribe()
    console.log(this.userOrders, 'userOrders')

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
