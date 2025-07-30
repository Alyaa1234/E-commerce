import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: false,
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
  verifyCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl('' , Validators.required)
  })

  responseErrorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService , private router: Router) { }

  handleVerifyCode()
  {
    if(this.verifyCodeForm.valid)
    {
      this.isLoading = true;
      this.authService.verifyResetPasswordCode(this.verifyCodeForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this.router.navigate(['/reset-password'])
        },
        error:(err)=>{
          this.isLoading = false;
          this.responseErrorMessage = err.error.message;
        }
      })
    }
  }
}
