import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATIONROUTES } from './utils/static';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';

const routes: Routes = [
  { path: NAVIGATIONROUTES.POSTLIST, component: PostListComponent },
  { path: NAVIGATIONROUTES.CREATEPOST, component: CreatePostComponent },
  { path: NAVIGATIONROUTES.SINGLEPOST, component: SinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
