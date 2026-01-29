import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faCog,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/auth-service';

@Component({
  selector: 'app-user-menu',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  auth = inject(AuthService);
  router = inject(Router);
  logout() {
    this.auth.Logout();
    this.router.navigate(['/home']);
  }
  faUser = faUser;
  faCart = faCartShopping;
  faSignOut = faSignOut;
  faCog = faCog;
  clicked: boolean = false;
}
