import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  responseErrorMessage = "";
  isLoading = false;

  constructor(private authSevice:AuthService , private router: Router){}

  handleForgetPassword()
  {
    if(this.forgetPasswordForm.valid)
    {
      this.isLoading = true;
      this.authSevice.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this.router.navigate(['/verify-code'])
        },
        error:(err)=>{
          this.isLoading = false;
          this.responseErrorMessage = err.error.message;
        }
      })
    }
  }
}
