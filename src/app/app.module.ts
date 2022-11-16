import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms'
import { ProductsService } from './services/products.service';
import { ShoppingCartService } from './services/shopping-cart.service'

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { AppComponent } from './app.component';
import { PizzasAllComponent } from './components/pizzas-all/pizzas-all.component';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyUaPipe } from './shared/pipes/currency-ua.pipe';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FooterComponent } from './components/footer/footer.component';
import {PrimengModule} from "./shared/primeng/primeng.module";
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { AuthorizationDialogComponent } from './components/authorization-dialog/authorization-dialog.component';
import { AdministrationComponent } from './components/administration/administration.component';



@NgModule({
  declarations: [
    AppComponent,
    PizzasAllComponent,
    PizzaCardComponent,
    CurrencyUaPipe,
    HeaderComponent,
    NotFoundPageComponent,
    ShoppingCartComponent,
    FooterComponent,
    ShoppingCartItemComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule

  ],
  providers: [ProductsService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
