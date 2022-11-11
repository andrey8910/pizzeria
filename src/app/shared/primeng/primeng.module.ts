import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule
  ],
  exports: [
    InputNumberModule,
    DropdownModule
  ]
})
export class PrimengModule { }
