import { Component , OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  canDeactivate(){
    if(this.loginFormObj.dirty && !this.isSubmitted)
    {
      return window.confirm('You have unsaved changes in login page. Do you really want to leave?');
    }
    return true;
  }

  isSubmitted: boolean = false;

  loginFormObj:FormGroup = new FormGroup({
    email: new FormControl("" , [Validators.required , Validators.email]),
    password: new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)])
  });

  responseErrorMessage = "";
  isLoading = false;
  loginSubscription!:Subscription;


  constructor(private authService: AuthService , private router:Router , private cartService: CartService){}

  handleLogin()
  {
    if(this.loginFormObj.valid)
    {
      this.isLoading = true;
      this.loginSubscription = this.authService.login(this.loginFormObj.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this.isSubmitted = true;
          localStorage.setItem("applicationToken" , response.token);
          this.authService.isLoggedIn.next(true);
          this.cartService.getUpdatedCartItemsNumber();
          this.authService.currentUserNameSubject.next(response.user.name);
          this.router.navigate(["/home"]);
        },
        error:(err)=>{
          this.isLoading = false;
          this.responseErrorMessage = err.error.message;
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
