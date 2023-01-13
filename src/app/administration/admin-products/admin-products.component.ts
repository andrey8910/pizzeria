import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Pizza } from '../../core/interfaces/pizza';
import {catchError, takeUntil, tap} from "rxjs/operators";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {Location} from "@angular/common";
import {Subject} from "rxjs";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProductsComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public loader: boolean = false;
  public products : Pizza[];


  constructor(private productsService: ProductsService,
              private messageService: MessageService,
              private confirmationService : ConfirmationService,
              private cdr: ChangeDetectorRef,
              private location: Location,) { }

  ngOnInit(): void {
    this.getPizzas()
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getPizzas(){
    this.loader = true;
    this.productsService.getPizzas()
      .pipe(
        tap((data:Pizza[]) => {
          this.products = data
          this.loader = false
          this.cdr.markForCheck()
        }),
        catchError((err) =>  {throw 'Помилка сервера. Деталі: ' + err}),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  public comeBack(){
    this.location.back()
  }

}
