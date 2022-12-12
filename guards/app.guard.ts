import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import {AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(private auth: AuthService,  private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
  /*  if (this.auth.LoggedIn) {
      // logged in so return true
      return true;
    }*/
    
    if (this.auth.LoggedIn) {
      // logged in so return true
      
      return true;
    }
    

    // not logged in so redirect to login page with the return url
   // this.auth.logout();
    this.router.navigate(['login'] );
    return false;
  }
}
