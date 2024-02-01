import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  errorMessageSub!: Subscription;

  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) return;
    const userData = {
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.loginUser(userData);
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
