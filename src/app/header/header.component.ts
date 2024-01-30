import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
