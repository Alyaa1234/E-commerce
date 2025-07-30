import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../custom validators/password-match';

@Component({
  selector: 'app-update-user-password',
  standalone: false,
  templateUrl: './update-user-password.component.html',
  styleUrl: './update-user-password.component.css'
})
export class UpdateUserPasswordComponent {
  isSubmitted: boolean = false;

  // create form object
  updateUserPasswordForm:FormGroup = new FormGroup({
    currentPassword: new FormControl("" , [Validators.required , Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)]),
    password: new FormControl("" , [Validators.required , Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)]),
    rePassword: new FormControl("" , [Validators.required , Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)]),
  } , {validators: passwordMatch})

  responseErrorMessage = "";
  isLoading = false;

  handleUpdateUserPassword(){

  }
}
