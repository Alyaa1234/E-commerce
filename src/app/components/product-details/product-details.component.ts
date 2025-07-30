import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnChanges {

  productDetails: Product | null = null;
  @Input() id!:string | null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.id != null && changes['id'].previousValue != changes["id"].currentValue)
    {
      this.productService.getProductDetails(this.id).subscribe({
        next:(response)=>{
          this.productDetails = response.data;
        }
      })
    }
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

  addToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (response) => {
        // console.log('Product added to wishlist:', response);
        alert(response.message);
      },
      error: (error) => {
        console.error('Error adding product to wishlist:', error);
      }
    });
  }
}
