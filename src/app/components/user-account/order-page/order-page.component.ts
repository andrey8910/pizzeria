import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  public orderId: number
  private subscription: Subscription;

  constructor( private activateRoute: ActivatedRoute,
               private location: Location,) { }

  ngOnInit(): void {
    this.init()
  }

  public comeBack(){
    this.location.back()
  }

  private init(){
    this.subscription = this.activateRoute.params.subscribe(params => this.orderId = params['id']);
  }

}
