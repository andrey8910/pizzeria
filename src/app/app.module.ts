import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from './services/products.service'

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { AppComponent } from './app.component';
import { PizzasAllComponent } from './components/pizzas-all/pizzas-all.component';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyUaPipe } from './shared/pipes/currency-ua.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzasAllComponent,
    PizzaCardComponent,
    CurrencyUaPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
