import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpinner = false;
  submitted = false;
  invalidLogin: boolean = false;
  error = '';
  isLoadingResults = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoadingResults = true;
    this.authService.login(this.loginForm.controls.username.value,this.loginForm.controls.password.value).subscribe(data => {
      this.isLoadingResults = false;
     
    }, error => {
        alert(error)
    });
    
  }

  ngOnInit() {
    if(this.authService.LoggedIn){
      this.router.navigate(['home']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}