import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
