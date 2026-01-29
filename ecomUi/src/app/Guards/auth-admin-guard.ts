import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Service/auth-service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    authService.Login();
    return false;
  }
  if (!authService.isAdmin()) {
    return false;
  }
  return true;
};
