import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from 'src/services/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('/login'))  return next.handle(request);
        if(this.authenticationService && this.authenticationService.LoggedIn){
        this.authenticationService.refreshtime();
        } else {
            this.authenticationService.logout();
            return ;
        }
        // add authorization header with jwt token if available
     /*   let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }*/

        return next.handle(request);
    }
}
export const jwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  };
  