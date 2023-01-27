import {Component, OnInit} from '@angular/core';
import {ScrollTopService} from "./core/services/scroll-top.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private ALL_PIZZA = 'pizza';
  private SHOPPING = 'shopping';
  private ADMIN = 'admin';
  private USER = 'user';


  private TITLE_LIST = {
    [this.ALL_PIZZA] : "Список піц",
    [this.SHOPPING] : "Кошик покупок",
    [this.ADMIN] : "Сторінка адміністратора",
    [this.USER] : "Сторінка користувача",

  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private scrollTopService: ScrollTopService) {
  }

  ngOnInit() {
    this.init();
  }

  private init(){
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd),
      tap((res) => {
        const v = res.url.slice(1);
        this.titleService.setTitle(this.TITLE_LIST[v] ? this.TITLE_LIST[v] : 'Pizzeria');
      })
    ).subscribe()


  }

  public hasScrollTop(){
    return this.scrollTopService.visible
  }

}
