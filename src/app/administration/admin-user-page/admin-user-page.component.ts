import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy,
  OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UsersService} from "../../core/services/users.service";
import {takeUntil, tap} from "rxjs/operators";
import {Users} from "../../core/interfaces/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passEqual, ValidateLogin, ValidatePass, ValidatePassConfirm} from "../../core/Validators";
import {OrdersService} from "../../core/services/orders.service";
import {Orders} from "../../core/interfaces/orders";
import {ProductsService} from "../../core/services/products.service";
import {Subject} from "rxjs";
import {Table} from "primeng/table";
import {SizeModel} from "../../core/interfaces/pizza";

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminUserPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('tableOrderTr') tableOrderTr: QueryList<any>;
  @ViewChild('tableOrder', {static: false}) tableOrder: Table;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  public isEdit = false;
  public hidePass = true;
  public hideConfirmPass = true;
  public readyOrdersList = false;
  public showToTopBtn = false;
  public userId: number;
  public userData: Users;
  public userOrders: Orders[] = [];
  public userOrdersUnitedProducts: any[] = [];
  public loader = false;
  private nextPage = 2;
  public formEditUserData: FormGroup;

  public infiniteObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        this.getUserOrders(this.nextPage++);
      }
    },
    {
      threshold: 0.9
    }
  )

  public scrollTableObserver = new IntersectionObserver(
    (entries) => {
      (entries[0].target == this.tableOrderTr.first.nativeElement) ? this.showToTopBtn = false : this.showToTopBtn = true;
      this.cdr.markForCheck()
    },
    { threshold: 0.9}
  )

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.initialization();
  }

  ngAfterViewInit() {

    if (this.tableOrderTr) {

      this.tableOrderTr.changes.pipe(
        tap(() => {
          if (this.tableOrderTr.last) {
            this.infiniteObserver.observe(this.tableOrderTr.last.nativeElement);

          }
         this.tableOrderTr.forEach((tr) => {
           this.scrollTableObserver.observe(tr.nativeElement)
         })

        }),
        takeUntil(this.destroy$),
      ).subscribe()
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  private initialization() {

    this.activateRoute.params.pipe(
      tap(params => this.userId = params['id']),
      tap(() => {
        if (this.userId) {
          this.getUserData();
          this.createFormEditUserData();
          this.getUserOrders();
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();


  }

  private getUserData() {
    this.usersService.getUserById(this.userId).pipe(
      tap((res: Users) => {
        this.userData = res;
        this.loader = true;
        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  private createFormEditUserData() {
    this.formEditUserData = new FormGroup<any>({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      login: new FormControl('', [Validators.required, ValidateLogin]),
      password: new FormControl('', [Validators.required, ValidatePass]),
      confirmPassword: new FormControl('', [Validators.required, ValidatePassConfirm])
    }, passEqual('password', 'confirmPassword'))

  }

  private getUserOrders(page = 1) {
    this.ordersService.getOrdersByClientIdPageByPage(3, page, this.userId).pipe(
      tap((res: Orders[]) => {
        if (res.length > 0) {
          this.userOrders.push(...res);
          this.getProductDataForOrderList(res);
          this.cdr.markForCheck();
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  private getProductDataForOrderList(ordersPage: Orders[]) {
    if (ordersPage.length > 0) {

      ordersPage.forEach((order: Orders) => {
        let orderChange: any = {
          orderNumber: order.id,
          createTime: order.creationTime,
          status: order.orderStatus,
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
            tap((res: any[]) => {
              productListItem.title = res[0].title;
              res[0].params.forEach((param: SizeModel) => {
                if(param.size == productListItem.size.key){
                  productListItem.price = param.price * productListItem.quantity;
                }
              });
              productListItem.params = res[0].params;
              orderChange.orderPrice += productListItem.price;
              this.cdr.markForCheck();
            }),
            takeUntil(this.destroy$)
          ).subscribe()
          orderChange.productList.push(productListItem)
          this.cdr.markForCheck();
        })
        this.userOrdersUnitedProducts.push(orderChange);
        this.cdr.markForCheck();
      })
    }
    this.readyOrdersList = true
  }


  public onNoClick() {
    this.formEditUserData.reset();
    this.isEdit = false;
    this.cdr.markForCheck();
  }

  public saveChangeUserData() {
    let newDataUser = {
      name: this.formEditUserData.controls['name'].value,
      login: this.formEditUserData.controls['login'].value,
      password: this.formEditUserData.controls['password'].value
    }
    this.usersService.editUser(newDataUser, this.userId).pipe(
      tap(res => {
        this.userData = res;
        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe()
    this.formEditUserData.reset();
    this.cdr.markForCheck();
  }

  public comeBack() {
    this.location.back();
  }

  public toTop() {
    if (this.tableOrder != null) {
      this.tableOrder.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.cdr.markForCheck();
    }
  }
}
