import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuthStatus();
    const protectedRoute = route.data['requireAuth'] === true;

    if (!isAuth && protectedRoute) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!isAuth && !protectedRoute) {
      return true;
    }

    if (isAuth && !protectedRoute) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
