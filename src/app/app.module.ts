import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './utils/AngularMaterial.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { PostModule } from './posts/post.module';
import { AuthModule } from './auth/auth.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NoPageFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PostModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
