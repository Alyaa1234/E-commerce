import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
    allWishlistProducts: Product[] | null = null;

    constructor(
      private wishListService: WishlistService,
      private cartService: CartService
    ) { }

    ngOnInit(): void {
      this.wishListService.getUserWishList().subscribe({
        next: (response) => {
          // console.log('User wishlist:', response.data);
          this.allWishlistProducts = response.data;
        },
        error: (error) => {
          console.error('Error fetching user wishlist:', error);
        }
      });
    }

   addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (response) => {
        // console.log('Product added to cart:', response);
        this.cartService.numOfCartItemsSubject.next(response.numOfCartItems);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
   }

    deleteWishlistItem(id: string){
       this.wishListService.deleteWishlistItem(id).subscribe({
         next: (response) => {
          //  console.log('Wishlist item removed:', response);
           this.wishListService.wishListProductsIds.next(response.data);
           this.wishListService.getUserWishList().subscribe({
             next: (updatedResponse) => {
               this.allWishlistProducts = updatedResponse.data;
             },
             error: (error) => {
               console.error('Error fetching updated wishlist:', error);
             }
           });
         },
         error: (error) => {
           console.error('Error removing wishlist item:', error);
         }
       });
     }

}
