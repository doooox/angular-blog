import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  exports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
})
export class AngularMaterialModule {}
