import { Component, OnInit } from '@angular/core';
import { Post } from '../post.models';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private postService: PostService,
    private router: ActivatedRoute
  ) {}

  getPost(id: string) {
    this.postService.getSinglePost(id).subscribe((response) => {
      this.post = response;
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getPost(id);
      }
    });
  }
}
