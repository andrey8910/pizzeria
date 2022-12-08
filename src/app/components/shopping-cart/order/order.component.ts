import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserAuthenticationCheckService} from "../../../shared/services/user-authentication-check.service";
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {Observable} from "rxjs";
import {PizzaOrder} from "../../../shared/interfaces/pizza-order";
import {AuthorizationDialogData} from "../../../shared/interfaces/authorization-dialog";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ UserAuthenticationCheckService]
})
export class OrderComponent implements OnInit {

  public shoppingCart$: Observable<PizzaOrder[]> ;
  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;

  constructor(private shoppingService: ShoppingCartService,
              private userAuthCheckService: UserAuthenticationCheckService) { }

  ngOnInit(): void {
    this.init()
  }

  private init(){
    this.shoppingCart$ = this.shoppingService.shoppingCart$
    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$
    this.userAuthenticationCheck$.pipe(
      tap((res) => {
        console.log('in order component',res)
      })
    ).subscribe()
  }

}
