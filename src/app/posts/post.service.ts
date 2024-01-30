import { Injectable } from '@angular/core';
import { Post, PostRequest, PostResponse } from './post.models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../utils/static';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  updatedPosts = new Subject<PostResponse>();

  constructor(private http: HttpClient, private router: Router) {}

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

  getSinglePost(id: string) {
    return this.http.get(`${baseURL}${id}`);
  }

  onAddPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post(`${baseURL}posts/add`, postData).subscribe((response) => {
      this.router.navigate(['']);
    });
  }
}
