import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UserPageComponent,

      }
    ])
  ]
})
export class UserAccountModule { }
