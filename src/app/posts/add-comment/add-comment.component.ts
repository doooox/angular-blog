import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { NgForm } from '@angular/forms';
import { Comment, CommentRequest } from '../post.models';
import { Subscription, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent implements OnInit {
  comments: Comment[] = [];
  postId!: string | null;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  onAddComment(form: NgForm) {
    if (form.invalid || !this.postId) return;

    const commentData: CommentRequest = {
      title: form.value.title,
      text: form.value.text,
    };

    this.commentService.addComment(this.postId, commentData);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.postId = paramMap.get('id');
    });
  }
}
