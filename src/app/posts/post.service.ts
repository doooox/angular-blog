import { Injectable } from '@angular/core';
import { Category, Post, PostResponse, UpdateRequest } from './post.models';
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
  getPostsByCategory(
    categoryId: string,
    postPerPage: number,
    currentPage: number
  ) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    return this.http.get<any>(
      `${baseURL}posts/filter/${categoryId}${queryParams}`
    );
  }

  getPostsUpdated() {
    return this.updatedPosts.asObservable();
  }

  getPostCategories() {
    return this.http.get<Category[]>(`${baseURL}categories/`);
  }

  getSinglePost(id: string) {
    return this.http.get<Post>(`${baseURL}posts/${id}`);
  }

  getPostForUpdate(id: string) {
    return this.http.get<UpdateRequest>(`${baseURL}posts/${id}`);
  }

  getSearchedPosts(query: string) {
    const queryParams = `?query=${query}`;

    return this.http.get<[{ _id: string; title: string }]>(
      `${baseURL}posts/search${queryParams}`
    );
  }

  onAddPost(title: string, content: string, image: File, categories: string[]) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    postData.append('categories', JSON.stringify(categories));
    this.http.post(`${baseURL}posts/add`, postData).subscribe((response) => {
      this.router.navigate(['']);
    });
  }

  onUpdatePost(
    id: string,
    title: string,
    content: string,
    image: File | string,
    categories: string[]
  ) {
    let postData: UpdateRequest | FormData;

    if (image instanceof File) {
      postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      postData.append('categories', JSON.stringify(categories));
      postData.append('image', image, title);
    } else {
      postData = {
        _id: id,
        title,
        content,
        categories,
        imagePath: image,
        author: null,
      };
    }

    this.http
      .put(`${baseURL}posts/update/${id}`, postData)
      .subscribe((response) => {
        this.router.navigate(['']);
      });
  }

  onDeletePost(id: string) {
    return this.http.delete(`${baseURL}posts/delete/${id}`);
  }
}
