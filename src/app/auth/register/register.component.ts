import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  errorMessageSub!: Subscription;

  constructor(private authService: AuthService) {}

  onRegister(form: NgForm) {
    if (form.invalid) return;
    const userData = {
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
    };
    this.authService.registerUser(userData);
  }
  ngOnInit(): void {
    this.errorMessageSub = this.authService
      .getErrorMessage()
      .subscribe((response) => {
        this.errorMessage = response;
      });
  }
  ngOnDestroy(): void {
    this.errorMessageSub.unsubscribe();
  }
}
