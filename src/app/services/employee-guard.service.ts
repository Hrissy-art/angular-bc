import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { AuthService } from './auth.service';
import { UserStoreService } from './user-store.service';
import { Observable, of, switchMap, map } from 'rxjs';

export const employeeGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  console.log('authService', 'router', 'userStoreService');

  const router = inject(Router);
  const userStoreService = inject(UserStoreService);

  // const userId = authService.getUserIdFromToken();
  // console.log("ID de l'utilisateur connecté:", userId);

  // Récupérez les rôles du token
  const rolesFromToken = authService.getRoleFromToken();

  return userStoreService.getRolesFromStore().pipe(
    switchMap((roles) => {
      console.log('Rôles récupérés du store:', roles);

      // Vérifiez si les rôles du token incluent 'ROLE_ADMIN'
      if (
        rolesFromToken.includes('ROLE_EMPLOYEE') ||
        rolesFromToken.includes('ROLE_ADMIN')
      ) {
        console.log("L'utilisateur est un employee ou un administrateur");
        return authService.isLoggedInObservable().pipe(
          map((loggedIn) => {
            if (loggedIn) {
              return true;
            } else {
              return router.createUrlTree(['/auth']);
            }
          })
        );
      } else {
        console.log("L'utilisateur n'est pas un administrateur");
        return of(router.createUrlTree(['/auth']));
      }
    })
  );
};
