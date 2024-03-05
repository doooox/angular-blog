import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Comment } from './posts/post.models';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io('http://localhost:5001');

  sendComment(comment: Comment) {
    this.socket.emit('comment-added', comment);
  }

  getSocket() {
    return this.socket;
  }
}
