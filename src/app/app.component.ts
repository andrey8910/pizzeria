import { Component } from '@angular/core';
import {ScrollTopService} from "./shared/services/scroll-top.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzeria';

  constructor(private scrollTopService: ScrollTopService) {

  }

  ngOnInit() {

  }

  public hasScrollTop(){
    return this.scrollTopService.visible
  }

}
