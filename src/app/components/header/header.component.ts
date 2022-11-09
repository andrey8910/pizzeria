import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Pizza } from "../../interfaces/pizza";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public shoppingCart$: Observable<Pizza[]> = this.shoppingService.shoppingCart$;

  constructor(private shoppingService: ShoppingCartService) {

  }

  ngOnInit(): void {

  }

}
