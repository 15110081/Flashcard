import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from '../auth/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { 
    this.isLoggedIn = false;
  }
  
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(["/homepage"]);
      this.roles = this.tokenStorage.getAuthorities();
      console.log(this.roles);
      
    }
  }
  
  ngOnInit() {
   
  }

}
