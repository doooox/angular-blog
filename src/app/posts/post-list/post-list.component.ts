import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.models';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsPerPage: number = 0;
  totalPosts: number = 0;
  currentPage: number = 1;
  pageSizeOptions = [5, 10, 15, 20];
  private postSub!: Subscription;
  breakpoint: number = 0;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.updateBreakpoint(window.innerWidth);
    this.postService.getAllPosts(this.postsPerPage, this.currentPage);
    this.postSub = this.postService.getPostsUpdated().subscribe((response) => {
      this.totalPosts = response.totalCount;
      this.posts = response.posts;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getAllPosts(this.postsPerPage, this.currentPage);
  }

  updateBreakpoint(width: number) {
    if (width <= 500) {
      this.breakpoint = 1;
    } else if (width <= 750) {
      this.breakpoint = 2;
    } else if (width <= 1000) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  onResize(event: any) {
    this.updateBreakpoint(event.target.innerWidth);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
