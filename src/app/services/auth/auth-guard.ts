import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedRoles = route.data['allowedRoles'];
    return this.authService.isAuthenticated(allowedRoles);
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   // return this.authService.isAuthenticated();
   const allowedRoles = route.data['allowedRoles'];
    return this.authService.isAuthenticated(allowedRoles);
  }
}
