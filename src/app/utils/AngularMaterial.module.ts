import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
  ],
})
export class AngularMaterialModule {}
