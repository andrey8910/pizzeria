import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Pizza } from '../../core/interfaces/pizza';
import {catchError, takeUntil, tap} from "rxjs/operators";
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
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
  public showCreateProduct = false;
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

  public addProduct(){
    this.showCreateProduct = true
    this.cdr.markForCheck()
  }

  public canselAddProduct(){
    this.showCreateProduct = false
  }

  public removeProduct(productId: number){
    this.confirmationService.confirm({
      message: 'Ви впевнені, що хочете видалити продукт ?',
      header: 'Видалення продукта',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.cdr.markForCheck();
        this.messageService.add({severity:'info', summary:'Підтверджено !', detail:'Продукт видалено !'});
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Відмінено !', detail:'Видалення скасовано.'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Скасовано !', detail:'Видалення скасовано.'});
            break;
        }
      }
    });

  }

  public comeBack(){
    this.location.back()
  }

}
