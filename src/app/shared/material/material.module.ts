import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatIconModule
  ]
})
export class MaterialModule { }
