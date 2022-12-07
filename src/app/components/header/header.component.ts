import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import { PizzaOrder } from "../../shared/interfaces/pizza-order";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public shoppingCart$: Observable<PizzaOrder[]> = this.shoppingService.shoppingCart$;

  constructor(private shoppingService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingService.shoppingCart$;
    this.shoppingService.loadAll();
  }

}
