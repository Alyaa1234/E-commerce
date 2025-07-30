import { Component, OnInit } from '@angular/core';
import { Brand } from '../../interfaces/brand';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-brands',
  standalone: false,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  brandsList: Brand[] = [];
  brandName: string = '';
  brandImage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllBrands().subscribe({
      next: (response) => {
        this.brandsList = response.data;
        // console.log(this.brandsList);
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }

  getBrandProducts( brandName: string , brandImage: string): void {
    // Implement the logic to fetch and display products for the selected brand
    this.brandName = brandName;
    this.brandImage = brandImage;
  }

}
