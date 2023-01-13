import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";
import {Pizza} from "../../core/interfaces/pizza";

@Component({
  selector: 'app-admin-product-page',
  templateUrl: './admin-product-page.component.html',
  styleUrls: ['./admin-product-page.component.scss']
})
export class AdminProductPageComponent implements OnInit,OnDestroy{
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public isLoader = false;
  public isReadyProductData = false;
  public canEdit = false;
  public productId: number;
  public productData: Pizza;
  constructor(private location: Location,
              private activateRoute: ActivatedRoute,
              private productsService: ProductsService,) {
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private  init(){
    this.activateRoute.params.pipe(
      tap(params => {
        this.productId = params['id'];
        this.isLoader = true;
      }),
      tap(() => {
        if (this.productId) {

          this.getProductData(this.productId);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();

  };

  private getProductData(productId: number){
    this.productsService.getPizzaById(productId).pipe(
      tap((product:Pizza[]) => {
        if(product.length == 0) {
          this.isReadyProductData = false;
        }
        this.isLoader = false;
        this.isReadyProductData = true;
        this.productData = product[0];
        console.log(this.productData)
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public comeBack() {
    this.location.back();
  }
}
