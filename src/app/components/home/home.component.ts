import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  productService = inject(ProductService);
  productsList: Product[] = [];

  ngOnInit(): void {
    // get all products
    this.productService.getAllProducts().subscribe({
      next:(response)=>{
        // console.log(response);
        this.productsList = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
