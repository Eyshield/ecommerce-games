import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../../../Service/user-service';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.html',
  styleUrl: './redirect.css',
})
export class Redirect implements OnInit {
  keycloak = inject(KeycloakService);
  router = inject(Router);

  userService = inject(UserService);
  async ngOnInit() {
    if (this.keycloak.isUserInRole('Admin')) {
      this.router.navigate(['/dashboard']);
    } else if (this.keycloak.isUserInRole('User')) {
      this.userService.getUserByMe().subscribe();
      this.router.navigate(['/personal']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
