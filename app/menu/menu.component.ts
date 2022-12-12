import { Component, OnInit, ViewChild } from '@angular/core';
//import { Observable } from 'rxjs';
//import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import { ApiService } from 'src/services/api.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;


  public get isLogon() : boolean{ 
    return this.authService.LoggedIn;
  };
     public logon : boolean = false;
     username:string;
     isExpanded = false;
     isShowing = false;
     show_bufer_value: boolean = false;
  

  constructor(/*private breakpointObserver: BreakpointObserver,*/
    private authService: AuthService,private apiServ: ApiService) {
    
    }
   
    show_bufer(){
      this.show_bufer_value=!this.show_bufer_value;
    }
   
    logout(){
      this.authService.logout();
    }
    toggle() {
      
      this.isExpanded = !this.isExpanded;
    }
    collapse() {
      this.isExpanded = false;
    }
    ngOnInit() {
      this.username=this.authService.currentUserValue.name;
      //this.authService.LoggedIn.subscribe(data =>{ this.logon=data.valueOf(); console.log(this.isLogon)});
    }
}
