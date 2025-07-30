import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private productService :ProductService){}
  productsList:Product[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next:(response)=>{
        this.productsList = response.data;
        // console.log(this.productsList);
      }
    })
  }

}
