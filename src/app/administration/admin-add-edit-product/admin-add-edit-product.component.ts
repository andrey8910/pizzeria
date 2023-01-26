import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ingredientsValidator, paramsValidator, ValidateUrl} from "../../core/Validators";
import {Pizza, SizeModel} from "../../core/interfaces/pizza";
import {ProductsService} from "../../core/services/products.service";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-add-edit-product',
  templateUrl: './admin-add-edit-product.component.html',
  styleUrls: ['./admin-add-edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAddEditProductComponent implements OnInit, OnDestroy{

  public showAddIngredientBtn = true;
  public showAddParamBtn = true;

  @Input() productToEdit: Pizza;
  @Output() isAddedProduct =  new EventEmitter<boolean>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public formAddOrEditProduct: FormGroup;
  public formAddParamProduct: FormGroup;

  constructor(private productsService: ProductsService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,) {
  }

  ngOnInit() {
    this.init();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private init(){
    this.getFormAddOrEditProduct();
  }

  private getFormAddOrEditProduct(){

    this.formAddOrEditProduct = this.fb.group({
      title: new FormControl(this.productToEdit ? this.productToEdit.title : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      description: new FormControl(this.productToEdit ? this.productToEdit.description : '', [ Validators.required, Validators.minLength(6), Validators.maxLength(900)]),
      ingredients: this.fb.array([], [ingredientsValidator]),
      minPrice: new FormControl(this.productToEdit ? this.productToEdit.minPrice : '', [Validators.required, Validators.min(100), Validators.max(2000)]),
      minWeight: new FormControl(this.productToEdit ? this.productToEdit.minWeight : '', [Validators.required, Validators.min(10), Validators.max(1500)]),
      params: this.fb.array([], [paramsValidator]),
      imageBig: new FormControl(this.productToEdit ? this.productToEdit.imageBig : '', [Validators.required, ValidateUrl]),
      imageMain: new FormControl(this.productToEdit ? this.productToEdit.imageMain : '', [Validators.required, ValidateUrl])
    });

    if(this.productToEdit){

      this.productToEdit.ingredients.forEach((ingredient: string) => {
        const ingredientForm = this.fb.group<any>({
          name: [ingredient, []]
        });
        this.ingredients.push(ingredientForm);
      });

      this.productToEdit.params.forEach((param: SizeModel) => {
        const paramForm = this.fb.group<any>({
          price: [param.price, []],
          size: [param.size, []],
          weight: [param.weight, []],
          title: [param.title, []],
        });
        this.params.push(paramForm);
      });
    }

    this.createFormAddParamProduct();

    this.cdr.markForCheck();

  }

  private createFormAddParamProduct(){
      this.formAddParamProduct = this.fb.group({
        size : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
        price: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1000)]),
        weight: new FormControl('', [Validators.required, Validators.min(10), Validators.max(2000)]),
        title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)])
      })
  }

  get ingredients(): FormArray {
    return this.formAddOrEditProduct.controls["ingredients"] as FormArray;
  }

  get params(): FormArray{
    return this.formAddOrEditProduct.controls["params"] as FormArray;
  }

  public addIngredient(){
    const ingredientForm = this.fb.group<any>({
      name: ['', []]
    });
    this.ingredients.push(ingredientForm);
    this.showAddIngredientBtn = false;
    this.cdr.markForCheck()
  }

  public saveIngredient(index: number, ingredientValue: string){
    if(ingredientValue.length > 0){
      this.ingredients.at(index).value.name = ingredientValue;
    }
    this.showAddIngredientBtn = true;
    this.cdr.markForCheck()
  }

  public removeIngredient(index: number){
    this.ingredients.removeAt(index);
    this.cdr.markForCheck();
  }

  public addParam(){
    this.showAddParamBtn = false;
    this.cdr.markForCheck();
  };

  public removeParam(indexParam: number){
    this.params.removeAt(indexParam);
    this.cdr.markForCheck();
  }

  public cancelAddParam(){
    this.formAddParamProduct.reset();
    this.showAddParamBtn = true;
    this.cdr.markForCheck();
  }

  public saveParam(formValue : SizeModel){

    const paramPropertyForm = this.fb.group({
      price: [formValue.price, []],
      size: [formValue.size, []],
      weight: [formValue.weight, []],
      title: [formValue.title, []],
    });

    this.params.push(paramPropertyForm);
    this.formAddParamProduct.reset();
    this.cdr.markForCheck();
  };

  public saveAddProduct(formValue: any){
    if(formValue){
      const newProductData : Pizza = {
        id: 0,
        title: formValue.title,
        description: formValue.description,
        minPrice: formValue.minPrice,
        ingredients: [],
        minWeight: formValue.minWeight,
        imageBig: formValue.imageBig,
        imageMain: formValue.imageMain,
        params : formValue.params
      }

      formValue.ingredients.forEach((ingredient: any) => {
        newProductData.ingredients.push(ingredient.name);
      })

      this.productsService.addPizza(newProductData).pipe(
        tap(res => {
          if(res){
            this.isAddedProduct.emit(true);
            this.formAddOrEditProduct.reset();
            this.cdr.markForCheck();
          }
        }),
        takeUntil(this.destroy$)
      ).subscribe()

    }
  }

  public saveEditProduct(formValue: any){

  }

  public cancelAddProduct(){
    this.isAddedProduct.emit(false);
    this.formAddOrEditProduct.reset();
    this.cdr.markForCheck();
  }

  public cancelEditProduct(){

    this.getFormAddOrEditProduct();

    this.cdr.markForCheck();
  }



}
