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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {PrimengModule} from "./shared/primeng/primeng.module";
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { AuthorizationDialogComponent } from './components/authorization-dialog/authorization-dialog.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationComponent,
    AuthorizationDialogComponent,
    //AdministrationComponent,
    //AdminProductsComponent,
   // AdminUsersComponent,
    //PizzasBannerComponent,
   // ProductsFilterPipe,
    RegistrationDialogComponent,

    // CommentsComponent,
    // CommentsListComponent,
    // CommentItemComponent,
    // CommentFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
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
