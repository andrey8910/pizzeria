import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {CurrencyUaPipe} from "../../shared/pipes/currency-ua.pipe";
import {RouterModule} from "@angular/router";
import {PizzaDetailsComponent} from "./pizza-details.component";
import {MaterialModule} from "../../shared/material/material.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentsComponent} from "../comments/comments/comments.component";
import {CommentsListComponent} from "../comments/comments-list/comments-list.component";
import {CommentItemComponent} from "../comments/comment-item/comment-item.component";
import {CommentFormComponent} from "../comments/comment-form/comment-form.component";



@NgModule({
  declarations: [
    PizzaDetailsComponent,
    CommentsComponent,
    CommentsListComponent,
    CommentItemComponent,
    CommentFormComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: PizzaDetailsComponent
      },
      { path: '**',
        loadChildren: () => import('../../components/not-found-page/not-found-page.module')
          .then(module => module.NotFoundPageModule)
      },
    ])
  ],
  providers: []
})
export class PizzaDetailsModule { }
