import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine,
  faGamepad,
  faReceipt,
  faShoppingCart,
  faSignOut,
  faTags,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../Service/auth-service';

@Component({
  selector: 'app-side-bar-admin',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './side-bar-admin.html',
  styleUrl: './side-bar-admin.css',
})
export class SideBarAdmin {
  authService = inject(AuthService);
  router = inject(Router);
  faSignOut = faSignOut;
  faUsers = faUsers;
  faGamepad = faGamepad;
  faCarts = faShoppingCart;
  faOrders = faReceipt;
  faCategory = faTags;
  faDashBoard = faChartLine;
  Logout() {
    this.authService.Logout();
    this.router.navigate(['/home']);
  }
}
