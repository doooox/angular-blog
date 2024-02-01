import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { LoginRequest, RegisterRequest, authResponse } from './auth.model';
import { baseURL } from '../utils/static';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated: boolean = false;
  private token!: string | null;
  private authStatusListener = new Subject<boolean>();
  private userId: string | null = null;
  private errorMessage = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getAuthStatus() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }

  private saveAuthData(token: string, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
  }

  private removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userId');
    if (!token) return;
    return {
      token,
      user,
    };
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo || !authInfo.token) {
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      return;
    }

    this.token = authInfo.token;
    this.isAuthenticated = true;
    this.userId = authInfo.user;
    this.authStatusListener.next(true);
  }

  registerUser(user: RegisterRequest) {
    this.http.post<authResponse>(`${baseURL}auth/register`, user).subscribe(
      (response) => {
        this.token = response.token;
        this.userId = response._id;
        if (response.token) {
          this.isAuthenticated = true;
          this.saveAuthData(response.token, response._id);
          this.authStatusListener.next(true);
        }
        this.router.navigate(['']);
      },
      (error) => {
        const errorMessage = error.error.message;
        this.errorMessage.next(errorMessage);
        throw new Error(errorMessage);
      }
    );
  }

  loginUser(user: LoginRequest) {
    this.http.post<authResponse>(`${baseURL}auth/login`, user).subscribe(
      (response) => {
        this.token = response.token;
        this.userId = response._id;
        if (response.token) {
          this.isAuthenticated = true;
          this.saveAuthData(response.token, response._id);
          this.authStatusListener.next(true);
        }
        this.router.navigate(['']);
      },
      (error) => {
        const errorMessage = error.error.message;
        this.errorMessage.next(errorMessage);
        throw new Error(errorMessage);
      }
    );
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.removeAuthData();
    this.userId = null;
    this.router.navigate(['']);
  }
}
