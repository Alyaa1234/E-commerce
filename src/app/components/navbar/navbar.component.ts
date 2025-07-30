import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedInUser = false;
  currentUserName: string |null = null;
  numOfLoggedUserCartItems:number = 0;

  constructor(
    private authService:AuthService ,
    private cartService:CartService
  ){}

  ngOnInit():void{

    this.cartService.numOfCartItemsSubject.subscribe({
      next:(value)=>{this.numOfLoggedUserCartItems = value}
    })

    this.cartService.getUpdatedCartItemsNumber();

    this.authService.isLoggedIn.subscribe({
      next:(value)=>{this.isLoggedInUser = value}
    })

    this.authService.currentUserNameSubject.subscribe({
      next:(value)=>{
        this.currentUserName = value;
      }
    })
  }

  logOut(){
    this.authService.logOut()
  }
}
