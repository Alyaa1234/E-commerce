import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl("" , [Validators.required , Validators.email]),
    newPassword: new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)])
  })

  responseErrorMessage='';
  isLoading= false;
  constructor(private authService:AuthService , private router:Router){}

  handleResetPassword(){
    if(this.resetPasswordForm.valid)
    {
      this.isLoading=true;
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next:()=>{
          this.isLoading=false;
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          this.isLoading=false;
          this.responseErrorMessage = err.error.message;
        }
      })
    }
  }
}
