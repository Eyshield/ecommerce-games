import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keycloak = inject(KeycloakService);
  isAdmin(): boolean {
    return this.keycloak.isUserInRole('Admin');
  }

  isUser(): boolean {
    return this.keycloak.isUserInRole('User');
  }
  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }
  Login(): void {
    this.keycloak.login();
  }
  Logout(): void {
    this.keycloak.logout();
  }
  Register(): void {
    this.keycloak.register();
  }
}
