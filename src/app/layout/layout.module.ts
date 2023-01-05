import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollTopComponent} from "./scroll-top/scroll-top.component";
import {MaterialModule} from "../shared/material/material.module";



@NgModule({
  declarations: [ScrollTopComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ScrollTopComponent
  ]
})
export class LayoutModule { }
