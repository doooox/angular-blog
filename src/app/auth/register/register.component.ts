import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
}
