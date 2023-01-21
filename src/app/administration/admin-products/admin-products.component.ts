import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Pizza } from '../../core/interfaces/pizza';
import {catchError, takeUntil, tap} from "rxjs/operators";
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import { MessageService } from 'primeng/api';
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidateUrl} from "../../core/Validators";


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
  public formNewProduct: FormGroup;



  constructor(private productsService: ProductsService,
              private messageService: MessageService,
              private confirmationService : ConfirmationService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              private location: Location,) { }

  ngOnInit(): void {
    this.getPizzas();
    this.createFormNewProduct();
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private createFormNewProduct(){
    this.formNewProduct = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      description: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(600)]),
      ingredients: this.fb.array([]),
      minPrice: new FormControl('', [Validators.required, Validators.min(100), Validators.max(2000)]),
      minWeight: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1500)]),
      params: this.fb.group({
        price: this.fb.array([]),
        weight: this.fb.array([]),
        size: this.fb.array([]),
        title: this.fb.array([]),
      }),
      imageBig: new FormControl('', [Validators.required, ValidateUrl]),
      imageMain: new FormControl('', [Validators.required, ValidateUrl])
    })
  }

  get ingredients(): FormArray {
    return this.formNewProduct.controls["ingredients"] as FormArray;
  }

  get params(): FormGroup{
    return this.formNewProduct.controls["params"] as FormGroup;
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

  public saveAddProduct(){
    console.log(this.formNewProduct.value)
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

  public addIngredient(){
    const ingredientForm = this.fb.group<any>({
      name: ['']
    });
    this.ingredients.push(ingredientForm);
    this.cdr.markForCheck()
  }

  public saveIngredient(index: number, ingredientValue: string){
    if(ingredientValue.length > 0){
      this.ingredients.at(index).value.name = ingredientValue;
    }
    this.cdr.markForCheck()
    console.log(index, ingredientValue )
  }

  public removeIngredient(index: number){
    this.ingredients.removeAt(index);
    this.cdr.markForCheck();
  }

  public addParamProperty(param: any){
    const paramPropertyForm = this.fb.group({
      '': ['', [Validators.required]]
    });
    this.getParamsProp(param).push(paramPropertyForm);
    this.cdr.markForCheck();
  }

  public saveParamProp(paramKey: string, paramIndex: number, propType: string, propValue: string){
    const paramPropertyForm = this.fb.group({
      [propType] : [this.checkTypeParamsProp(propValue) ? +propValue : propValue, [Validators.required]]
    });
    this.getParamsProp(paramKey).push(paramPropertyForm);
    this.getParamsProp(paramKey).removeAt(paramIndex);
    this.cdr.markForCheck();
  }

  public getParamsProp(prop : any){
    return (this.params.controls[`${prop}`] as FormArray);
  }

  public checkTypeParamsProp(prop: any): boolean {
    return isFinite(prop);
  }

  public comeBack(){
    this.location.back()
  }

}
