import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faCog,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/auth-service';

@Component({
  selector: 'app-user-menu',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  auth = inject(AuthService);
  logout() {
    this.auth.Logout();
  }
  faUser = faUser;
  faCart = faCartShopping;
  faSignOut = faSignOut;
  faCog = faCog;
  clicked: boolean = false;
}
