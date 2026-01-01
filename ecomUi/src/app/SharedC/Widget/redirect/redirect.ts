import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.html',
  styleUrl: './redirect.css',
})
export class Redirect implements OnInit {
  keycloak = inject(KeycloakService);
  router = inject(Router);
  async ngOnInit() {
    const isLogged = await this.keycloak.isLoggedIn();

    if (!isLogged) {
      await this.keycloak.login();
      return;
    }

    if (this.keycloak.isUserInRole('Admin')) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/personal']);
    }
  }
}
