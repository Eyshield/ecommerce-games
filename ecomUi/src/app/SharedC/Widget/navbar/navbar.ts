import { Component, inject } from '@angular/core';
import { UserMenu } from '../user-menu/user-menu';
import { AuthService } from '../../../Service/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [UserMenu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  Register() {
    this.authService.Register();
  }
  Login() {
    this.authService.Login();
  }
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn();
}
