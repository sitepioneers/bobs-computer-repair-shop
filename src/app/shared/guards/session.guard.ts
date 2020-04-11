/*
========================
; Title: session.guard.ts
; Author: Professor Krasso
; Date: 8 April 2020
; Description: Session guard
========================
*/


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import { CookieService} from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class SessionGuard implements CanActivate, CanActivateChild{

  constructor(private router: Router, private cookieService: CookieService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  const isAuthenticated = this.cookieService.get('sessionuser');

  if (isAuthenticated) {
  return true;
  } else {
this.router.navigate(['/session/signin']);
return false;
}
}
canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  const isAuthenticated = this.cookieService.get('sessionuser');

  if (isAuthenticated) {
  return true;
  } else {
this.router.navigate(['/session/signin']);
return false;
}
}
}
