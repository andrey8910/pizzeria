import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule,
    TooltipModule,
    TabViewModule
  ],
  exports: [
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule,
    TooltipModule,
    TabViewModule
  ],
  providers: [MessageService]
})
export class PrimengModule { }
