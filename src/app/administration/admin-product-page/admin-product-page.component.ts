import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";
import {Pizza} from "../../core/interfaces/pizza";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

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
  public formProductData: FormGroup;



  constructor(private location: Location,
              private activateRoute: ActivatedRoute,
              private productsService: ProductsService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,) {
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

  private createdFormProductData(){
    if(this.productData){
      this.formProductData = this.fb.group<any>({
        title: new FormControl(this.productData.title, [Validators.required, Validators.minLength(6)]),
        description: new FormControl(this.productData.description, [ Validators.required, Validators.minLength(6)]),
        ingredients: this.fb.array([]),
        minPrice: new FormControl(this.productData.minPrice, [Validators.required]),
        minWeight: new FormControl(this.productData.minWeight, [Validators.required]),
        params: this.fb.group({}),
        imageBig: new FormControl(this.productData.imageBig, [Validators.required]),
        imageMain: new FormControl(this.productData.imageMain, [Validators.required])
      })

      if(this.productData.ingredients){
        this.productData.ingredients.forEach(ingredient => {
          const ingredientForm = this.fb.group<any>({
            name: [ingredient, [Validators.required, Validators.minLength(3)]]
          });
          (this.formProductData.controls['ingredients'] as FormArray).push(ingredientForm)
        })
      }

      if(this.productData.params){

        Object.entries(this.productData.params).forEach(param =>{
          (this.formProductData.get('params') as FormGroup).setControl(param[0], new FormArray([]));

          Object.entries(param[1]).forEach((value : any) => {
           Object.entries(value[1]).forEach(v => {
             const paramForm = this.fb.group<any>({
               [v[0]] : [v[1], [Validators.required]]
             });
             ((this.formProductData.get('params') as FormGroup).get(param[0]) as FormArray).push(paramForm)
           })

          })
        })
        this.cdr.markForCheck()
      }

      this.cdr.markForCheck()
    }
    this.cdr.markForCheck()
  }

  get ingredients(): FormArray {
    return this.formProductData.controls["ingredients"] as FormArray;
  }

  get params(): FormGroup{
    return this.formProductData.controls["params"] as FormGroup;
  }

  public getParamsProp(prop : any){
     // console.log(prop, ((this.formProductData?.controls["params"] as FormGroup).controls[`${prop}`] as FormArray).controls)
     return ((this.formProductData?.controls["params"] as FormGroup).controls[`${prop}`] as FormArray);


  }

  private getProductData(productId: number){
    this.productsService.getPizzaById(productId).pipe(
      tap((product:Pizza[]) => {
        if(product.length == 0) {
          this.isReadyProductData = false;
        }
        this.isLoader = false;
        this.isReadyProductData = true;
        this.productData = product[0];
        this.createdFormProductData();
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public addIngredient(){
    const ingredientForm = this.fb.group<any>({
      name: ['', Validators.required]
    });
    this.ingredients.push(ingredientForm);
    this.cdr.markForCheck()
  }

  public saveIngredientName(index: number, value: string){
    if(value.length > 0){
      this.ingredients.at(index).value.name = value;
    }
    this.cdr.markForCheck()
  }

  public deleteIngredient(index:number){

      this.confirmationService.confirm({
        message: 'Ви впевнені, що хочете видалити інгридієнт ?',
        header: 'Видалення інгридієнта',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.ingredients.removeAt(index);
          this.cdr.markForCheck();
          this.messageService.add({severity:'info', summary:'Підтверджено !', detail:'Інгридієнт видалено !'});
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

  public editProductData(){
    console.log(this.formProductData.value);
    console.log(this.params)
  }

  public addParamProperty(param: any){
    const paramPropertyForm = this.fb.group({
      '': ['', [Validators.required]]
    });
    this.getParamsProp(param).push(paramPropertyForm);
    this.cdr.markForCheck();
  }

  public saveParamProperty(paramKey: string, paramIndex: number, propType: string, propValue: string){

    const paramPropertyForm = this.fb.group({
      [propType] : [this.checkTypeParamsProp(propValue) ? +propValue : propValue, [Validators.required]]
    });

    this.getParamsProp(paramKey).push(paramPropertyForm);
    this.getParamsProp(paramKey).removeAt(paramIndex);
    this.cdr.markForCheck();
  }

  public removeParamProperty(param: string, indexProp: number){

    this.confirmationService.confirm({
      message: 'Ви впевнені, що хочете видалити властивість ?',
      header: 'Видалення властивості',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.getParamsProp(param).removeAt(indexProp);
        this.cdr.markForCheck();
        this.messageService.add({severity:'info', summary:'Підтверджено !', detail:'Властивість видалено !'});
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


  public comeBack() {
    this.location.back();
  }
  public  test(prop: any){
    console.log(isFinite(prop),'!')
  }

  public checkTypeParamsProp(prop: any): boolean {
      return isFinite(prop);
  }
}
