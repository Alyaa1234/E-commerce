import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category } from '../../interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  standalone: false,
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent implements OnInit {

  productService = inject(ProductService);
  categoriesList: Category[] = [];

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
          items: 7
        }
      },
      nav: false
    }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe({
      next:(response)=>{
        this.categoriesList = response.data;
      }
    })

  }

}
