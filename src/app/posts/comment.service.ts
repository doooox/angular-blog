import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, CommentRequest } from './post.models';
import { baseURL } from '../utils/static';
import { Subject } from 'rxjs';
import { SocketService } from '../socket.service';

@Injectable({ providedIn: 'root' })
export class CommentService {
  updatedComments = new Subject<void>();

  constructor(private http: HttpClient, private socketService: SocketService) {}

  addComment(postId: string, comment: CommentRequest) {
    this.http
      .post<Comment>(`${baseURL}comment/${postId}/add`, comment)
      .subscribe((response) => {
        this.updatedComments.next();
        this.socketService.emitEvent('comment-added', response);
      });
  }

  getPostComments(postId: string) {
    return this.http.get<Comment[]>(`${baseURL}comment/${postId}`);
  }

  getUpdatedComments() {
    return this.updatedComments.asObservable();
  }
}
