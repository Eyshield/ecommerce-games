import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap } from 'rxjs';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);
  return from(keycloak.getToken()).pipe(
    switchMap((token) => {
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next(authReq);
      }

      return next(req);
    })
  );
};
