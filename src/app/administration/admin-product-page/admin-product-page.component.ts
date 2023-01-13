import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";
import {ProductsService} from "../../core/services/products.service";
import {Pizza} from "../../core/interfaces/pizza";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
              private fb: FormBuilder) {
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
        minWeight: new FormControl(this.productData.minWeight, [Validators.required])
      })

      if(this.productData.ingredients){
        this.productData.ingredients.forEach(ingredient => {
          const ingredientForm = this.fb.group<any>({
            name: [ingredient, [Validators.required, Validators.minLength(3)]]
          });
          (this.formProductData.controls['ingredients'] as FormArray).push(ingredientForm)
        })
      }
    }
    this.cdr.markForCheck()
  }

  get ingredients(): FormArray {
    return this.formProductData.controls["ingredients"] as FormArray;
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
        console.log(this.productData)
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
    if(index){
      this.ingredients.removeAt(index);
      this.cdr.markForCheck()
    }
  }

  public editProductData(){
    console.log(this.formProductData.value)
  }


  public comeBack() {
    this.location.back();
  }
}
