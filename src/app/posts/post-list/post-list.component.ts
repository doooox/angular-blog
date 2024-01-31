import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.models';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub!: Subscription;

  postsPerPage: number = 5;
  totalPosts: number = 0;
  currentPage: number = 1;
  pageSizeOptions = [5, 10, 15, 20];

  breakpoint: number = 0;

  private authStatusSubs!: Subscription;
  userIsAuthenticated = false;
  userId: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateBreakpoint(window.innerWidth);
    this.postService.getAllPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postSub = this.postService.getPostsUpdated().subscribe((response) => {
      this.totalPosts = response.totalCount;
      this.posts = response.posts;
    });
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authStatusSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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

  onPostDelete(id: string) {
    this.postService.onDeletePost(id).subscribe((response) => {
      this.postService.getAllPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
}
