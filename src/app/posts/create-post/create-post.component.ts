import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { mimeTypeValidator } from '../../utils/mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category, UpdateRequest } from '../post.models';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private mode: string = 'create';
  private id: string | null = '';
  categories: Category[] = [];

  form!: FormGroup;
  imagePreview!: string;
  postForUpdate: UpdateRequest | undefined;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
      categories: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.postService.getPostCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        if (this.id !== null) {
          this.postService.getSinglePost(this.id).subscribe((postData) => {
            if (this.id !== null) {
              this.postForUpdate = {
                _id: this.id,
                title: postData.title,
                content: postData.content,
                imagePath: postData.imagePath,
                author: postData.author,
                categories: postData.categories.map((category) => category._id),
              };
              this.form?.setValue({
                title: this.postForUpdate.title,
                content: this.postForUpdate.content,
                image: this.postForUpdate.imagePath,
                categories: this.postForUpdate.categories,
              });
            }
          });
        }
      } else {
        this.mode = 'create';
        this.id = null;
        this.postForUpdate = undefined;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.form.get('image')?.setValue(file);

    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file as File);
  }

  onSavePost() {
    if (this.form.invalid) return;
    const title = this.form.value.title;
    const content = this.form.value.content;
    const image = this.form.value.image;
    const categories = this.form.value.categories;

    if (this.mode === 'create') {
      this.postService.onAddPost(title, content, image, categories);
    } else if (this.mode === 'edit' && this.id !== null) {
      this.postService.onUpdatePost(this.id, title, content, image, categories);
    }
  }
}
