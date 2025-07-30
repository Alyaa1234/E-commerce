import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-info',
  standalone: false,
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css'
})
export class EditUserInfoComponent {
    editUserInfoForm:FormGroup = new FormGroup({
    name: new FormControl("" , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl("" , [Validators.required , Validators.email]),
    phone: new FormControl("" , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  responseErrorMessage = "";
  isLoading = false;

  // constructor(private authService:AuthService , private router:Router){}

  handleEditUserInfo()
  {}
}
