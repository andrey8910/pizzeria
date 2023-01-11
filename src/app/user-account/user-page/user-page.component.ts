import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {OrdersService} from "../../core/services/orders.service";
import {Orders} from "../../core/interfaces/orders";
import {UserAuthenticationCheckService} from "../../core/services/user-authentication-check.service";
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../core/interfaces/authorization-dialog";


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public userOrdersAll: Orders[]
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultAuth: AuthorizationDialogData;

  constructor(
    private ordersService: OrdersService,
    private userAuthCheckService: UserAuthenticationCheckService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.init()
  }
  private init(){

  }

  public comeBack(){
    this.location.back()
  }

}
