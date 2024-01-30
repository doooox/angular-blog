import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { mimeTypeValidator } from '../../utils/mime-type.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  imagePreview!: string;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
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
    const postData = {};
    this.postService.onAddPost(
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
  }
}
