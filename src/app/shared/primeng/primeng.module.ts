import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';

import {MessageService} from 'primeng/api';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule
  ],
  exports: [
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class PrimengModule { }
