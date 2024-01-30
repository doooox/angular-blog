import { Injectable } from '@angular/core';
import { Post, PostResponse } from './post.models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../utils/static';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  updatedPosts = new Subject<PostResponse>();

  constructor(private http: HttpClient) {}

  getAllPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;

    this.http
      .get<PostResponse>(`${baseURL}posts${queryParams}`)
      .subscribe((response) => {
        this.posts = response.posts;
        this.updatedPosts.next({
          posts: [...this.posts],
          totalCount: response.totalCount,
        });
      });
  }

  getPostsUpdated() {
    return this.updatedPosts.asObservable();
  }
}
