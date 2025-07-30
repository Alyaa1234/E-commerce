import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishListProductsIds = new BehaviorSubject<string[]>([]);

  constructor(private httpClient:HttpClient) {
    this.getUserWishList().subscribe({
      next: (response) => {
          // console.log('User wishlist:', response.data);
          this.wishListProductsIds.next((response.data as Product[]).map((product) => product._id));
        },
        error: (error) => {
          console.error('Error fetching user wishlist:', error);
        }
      });
   }

  addProductToWishlist(productId:string):Observable<any>
  {
    return this.httpClient.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist", {productId: productId}
    )
  }

  getUserWishList():Observable<any>
  {
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist");
  }

  deleteWishlistItem(id:string):Observable<any>
  {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`);
  }
}
