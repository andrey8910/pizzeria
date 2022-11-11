import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule
  ],
  exports: [
    InputNumberModule,
    DropdownModule,
    RadioButtonModule
  ]
})
export class PrimengModule { }
