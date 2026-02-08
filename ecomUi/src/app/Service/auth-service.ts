import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { user } from '../Models/User.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keycloak = inject(KeycloakService);
  isAdmin(): boolean {
    return this.keycloak.isUserInRole('Admin');
  }

  getCurrentUserId(): string | null {
    const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
    return tokenParsed?.sub ?? null;
  }
  getCurrentUserInfo(): user | null {
    const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
    if (tokenParsed) {
      return {
        keycloakId: tokenParsed.sub,
        email: tokenParsed['email'] ?? '',
        username: tokenParsed['preferred_username'] ?? '',
        nom: tokenParsed['family_name'] ?? '',
        prenom: tokenParsed['given_name'] ?? '',
      };
    } else {
      return null;
    }
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
