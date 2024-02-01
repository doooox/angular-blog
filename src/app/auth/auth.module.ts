import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../utils/AngularMaterial.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
  ],
})
export class AuthModule {}
