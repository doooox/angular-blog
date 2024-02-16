import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  searchResults: { title: string; id: string }[] = [];

  constructor(private postService: PostService, private router: Router) {}

  onInputChange() {
    this.searchResults = [];
    if (!this.query) return;
    this.postService.getSearchedPosts(this.query).subscribe((response) => {
      response.forEach((post) => {
        this.searchResults.push({ title: post.title, id: post._id });
      });
    });
  }

  onSelectInput(selectedPost: { title: string; id: string }) {
    this.router.navigate(['/post', selectedPost.id]);
    this.query = '';
    this.searchResults = [];
  }
}
