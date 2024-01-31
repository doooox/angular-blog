import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { mimeTypeValidator } from '../../utils/mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UpdateRequest } from '../post.models';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private mode: string = 'create';
  private id: string | null = '';

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
              };
              this.form?.setValue({
                title: this.postForUpdate.title,
                content: this.postForUpdate.content,
                image: this.postForUpdate.imagePath,
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
    if (this.mode === 'create') {
      this.postService.onAddPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else if (this.mode === 'edit' && this.id !== null) {
      this.postService.onUpdatePost(
        this.id,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
  }
}
