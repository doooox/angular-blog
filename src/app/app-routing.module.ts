import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATIONROUTES } from './utils/static';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: NAVIGATIONROUTES.POSTLIST, component: PostListComponent },
  {
    path: NAVIGATIONROUTES.CREATEPOST,
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  { path: NAVIGATIONROUTES.REGISTER, component: RegisterComponent },
  { path: NAVIGATIONROUTES.LOGIN, component: LoginComponent },
  { path: NAVIGATIONROUTES.SINGLEPOST, component: SinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
