import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Comment } from './posts/post.models';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io('http://localhost:5001');

  emitEvent(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  getSocket() {
    return this.socket;
  }
}
