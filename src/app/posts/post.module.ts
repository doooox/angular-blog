import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../utils/AngularMaterial.module';
import { RouterModule } from '@angular/router';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
  declarations: [
    PostListComponent,
    SinglePostComponent,
    CreatePostComponent,
    AddCommentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
  ],
})
export class PostModule {}
