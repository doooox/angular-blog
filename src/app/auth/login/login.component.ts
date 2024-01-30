import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  onLogin(form: NgForm) {
    if (form.invalid) return;
    const userData = {
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.loginUser(userData);
  }
}
