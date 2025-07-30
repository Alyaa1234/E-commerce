import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../interfaces/cart-response';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartDetails: CartResponse|null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        // console.log('User cart:', response);
        this.cartDetails = response;
      },
      error: (error) => {
        console.error('Error fetching user cart:', error);
      }
    });
  }

  deleteCartItem(id: string){
    this.cartService.removeSpacificCartItem(id).subscribe({
      next: (response:CartResponse) => {
        // console.log('Cart item removed:', response);
        this.cartDetails = response; // Update cart details after deletion
        this.cartService.numOfCartItemsSubject.next(response.numOfCartItems);
      },
      error: (error) => {
        console.error('Error removing cart item:', error);
      }
    });
  }

  updateProductQuantity(id: string, count: number) {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (response:CartResponse) => {
        // console.log('Cart item quantity updated:', response);
        this.cartDetails = response; // Update cart details after quantity change
        this.cartService.numOfCartItemsSubject.next(response.numOfCartItems);
      },
      error: (error) => {
        console.error('Error updating cart item quantity:', error);
      }
    });
  }

  clearCart(){
    this.cartService.removeUserCart().subscribe({
      next:(response:CartResponse)=>{
        // console.log(response);
        this.cartDetails = null;
        this.cartService.numOfCartItemsSubject.next(0);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
