

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/model/user.model';
import { environment } from '../environments/environment';
import { Router, RouteReuseStrategy } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

export interface AuthUser {
    // access_token: string;
    // refresh_token: string;
    adm_user_id: number;
    login: string;
    name: string;
    login_date: Date;
}
export interface AuthUserResp {
    items: AuthUser;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}
export interface ret {
    ret: string;
}
@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    private currentUserSource: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;
    //  private loggedin:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);
    // public loggedin: boolean = false;
    public get LoggedIn(): boolean {

        let res = false;
        let usr = this.currentUserSource.value;

        if (usr) {
            let curr = new Date().getTime();
            let ld = new Date(usr.login_date).getTime();
            let diff = (curr - ld) / (1000 * 60);
            if (diff < 30)
                res = true;
        }
        return res;
    }

    //public get LoggedIn():Observable<boolean> {return this.loggedin.asObservable();}
    // constructor(private http: HttpClient,private router: Router) {
    //     this.currentUserSource = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
    //     this.currentUser = this.currentUserSource.asObservable();
    // }

    public get currentUserValue(): AuthUser {
        return this.currentUserSource.value;
    }
    constructor(private http: HttpClient, private router: Router,private location: Location) {
        this.currentUserSource = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSource.asObservable();
    }

    baseUrl: string = environment.apiBaseUrl;


    login(p_login: string, p_pass: string) {

        return this.http.post(this.baseUrl + '/api/login', { p_login, p_pass }).pipe(map((user: any) => {
            //console.log(user);
            //this.loggedin=new BehaviorSubject<boolean>(true);
            //      this.loggedin = true;
            this.http.get<AuthUserResp>(this.baseUrl + '/api/login/' + user.user_id).pipe(map(par => {
                var usr = par.items[0];
                usr.login_date = new Date();
                localStorage.setItem('currentUser', JSON.stringify(usr));
                this.currentUserSource.next(usr);
               
            })).subscribe(data =>{
                //this.router.navigate(['servlist']);
               
                    location.reload();
                /*this.router.initialNavigation();
                this.router.navigated=true;
                this.router.onSameUrlNavigation="reload";*/
                //this.router.routeReuseStrategy=RouteReuseStrategy;
            
                 //console.log("after navigate");
               //  this.router.reload();
               });

        }));
    }
    refreshtime() {
        var usr = this.currentUserSource.value;
        if (usr) {
            usr.login_date = new Date();
            localStorage.setItem('currentUser', JSON.stringify(usr));
            this.currentUserSource.next(usr);
            
        }
    }
    logout() {

        //this.loggedin=new BehaviorSubject<boolean>(true);
        //   this.loggedin = false;
        localStorage.removeItem('currentUser');
        this.currentUserSource.next(null);
        this.router.navigate(['/login']);
    }
}