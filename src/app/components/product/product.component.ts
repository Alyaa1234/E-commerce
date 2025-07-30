import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../interfaces/cart-response';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  @Input({required:true}) product!:Product;

  wishListProductsIdsList : string[] = [];

  ngOnInit(): void {
    this.wishlistService.wishListProductsIds.subscribe({
      next: (ids) => {
        this.wishListProductsIdsList = ids;
      }
    });
  }

  cartService = inject(CartService);
  wishlistService = inject(WishlistService);

  getTwoWords(str:string)
  {
    return str.split(" ", 2).join(" ");
  }

  addToCart(id:string)
  {
    this.cartService.addProductToCart(id).subscribe({
      next: (response:CartResponse) => {
        // console.log('Product added to cart:', response);
        this.cartService.numOfCartItemsSubject.next(response.numOfCartItems);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    })
  }

  addToWishlist(id:string)
  {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (response) => {
        // console.log('Product added to wishlist:', response);
        this.wishlistService.wishListProductsIds.next(response.data);
      },
      error: (error) => {
        console.error('Error adding product to wishlist:', error);
      }
    });
  }

  isWishListProduct(id:string):boolean
  {
    return this.wishListProductsIdsList.includes(id);
  }

}
