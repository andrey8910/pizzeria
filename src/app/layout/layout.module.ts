import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollTopComponent} from "./scroll-top/scroll-top.component";
import {MaterialModule} from "../shared/material/material.module";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {PrimengModule} from "../shared/primeng/primeng.module";
import {AuthorizationComponent} from "../authorization/authorization.component";



@NgModule({
  declarations: [
    HeaderComponent,
    AuthorizationComponent,
    ScrollTopComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
  ],
  exports: [
    HeaderComponent,
    AuthorizationComponent,
    ScrollTopComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
