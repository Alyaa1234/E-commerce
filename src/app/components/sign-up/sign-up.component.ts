import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordMatch } from '../../custom validators/password-match';


@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnDestroy{

  canDeactivate(){
    if(this.signUpFormObj.dirty && !this.isSubmitted)
    {
      return window.confirm('You have unsaved changes in SignUp page. Do you really want to leave?');
    }
    return true;
  }

  isSubmitted: boolean = false;

  // create form object
  signUpFormObj:FormGroup = new FormGroup({
    name: new FormControl("" , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl("" , [Validators.required , Validators.email]),
    password: new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
    rePassword: new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
    phone: new FormControl("" , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , {validators: passwordMatch})

  responseErrorMessage = "";
  isLoading = false;
  signUpSubscription!:Subscription;

  constructor(private authService:AuthService , private router:Router){}

  handleSignUp()
  {
    // check form is valid
    if(this.signUpFormObj.valid){
      // loading
      this.isLoading=true;
      this.signUpSubscription = this.authService.signUp(this.signUpFormObj.value).subscribe({
        next:(response)=>{
          // navigate to home page
          this.isLoading = false;
          this.isSubmitted = true;
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          this.isLoading = false;
          this.responseErrorMessage = err.error.message;
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }

}
