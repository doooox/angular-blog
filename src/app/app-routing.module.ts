import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATIONROUTES } from './utils/static';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  { path: NAVIGATIONROUTES.POSTLIST, component: PostListComponent },
  {
    path: NAVIGATIONROUTES.CREATEPOST,
    component: CreatePostComponent,
    canActivate: [AuthGuard],
    data: { requireAuth: true },
  },
  {
    path: NAVIGATIONROUTES.UPDATEPOST,
    component: CreatePostComponent,
    canActivate: [AuthGuard],
    data: { requireAuth: true },
  },
  {
    path: NAVIGATIONROUTES.REGISTER,
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { requireAuth: false },
  },
  {
    path: NAVIGATIONROUTES.LOGIN,
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { requireAuth: false },
  },
  { path: NAVIGATIONROUTES.POSTLISTBYCATEGORY, component: PostListComponent },
  { path: NAVIGATIONROUTES.SINGLEPOST, component: SinglePostComponent },

  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
