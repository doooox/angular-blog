import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatInputModule,
  ],
})
export class AngularMaterialModule {}
