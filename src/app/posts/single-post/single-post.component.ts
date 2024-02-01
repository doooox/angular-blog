import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comment, Post } from '../post.models';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from '../comment.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postSub!: Subscription;
  comments: Comment[] = [];
  commentSub!: Subscription;
  private authStatusSubs!: Subscription;
  userIsAuthenticated = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.postSub = this.postService
          .getSinglePost(id)
          .subscribe((response) => {
            this.post = response;
          });

        this.commentSub = this.commentService
          .getUpdatedComments()
          .subscribe(() => {
            this.commentService.getPostComments(id).subscribe((comments) => {
              this.comments = comments;
            });
            this.postService.getSinglePost(id).subscribe((response) => {
              this.post = response;
            });
          });
      }
    });
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authStatusSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.commentSub) {
      this.commentSub.unsubscribe();
    }
  }
}
