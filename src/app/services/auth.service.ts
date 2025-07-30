import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/register-request';
import { LoginRequest } from '../interfaces/login-request';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient , private router: Router) { };

  isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem("applicationToken")?true:false);

  currentUserNameSubject = new BehaviorSubject<string|null>(this.getCurrentUserName());



  getCurrentUserName()
  {
    let token = localStorage.getItem('applicationToken');
    if(token){
      let decodedToken:any = jwtDecode(token);
      return decodedToken.name;
    }
    return null;
  }

  signUp(registerObj:RegisterRequest):Observable<any>
  {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , registerObj)
  }


  login(loginObj:LoginRequest):Observable<any>
  {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , loginObj)
  }


  logOut()
  {
    // remove token from locallstorage
    localStorage.removeItem("applicationToken");

    this.isLoggedIn.next(false);

    this.currentUserNameSubject.next(null);

    // navigate to login page
    this.router.navigate(["/login"]);

  }


  forgetPassword(form:any):Observable<any>
  {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , form);
  }


  verifyResetPasswordCode(form:any):Observable<any>
  {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , form);
  }


  resetPassword(form:any):Observable<any>
  {
    return this.httpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , form);
  }


}
