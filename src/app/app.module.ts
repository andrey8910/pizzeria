import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from './services/products.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzasAllComponent } from './components/pizzas-all/pizzas-all.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzasAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
