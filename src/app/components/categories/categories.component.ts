import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  productService = inject(ProductService);
  categoriesList: Category[] = [];
  categoryName: string = '';
  categorySubCategories: any[] = [];


  ngOnInit(): void {
    this.productService.getAllCategories().subscribe({
      next:(response)=>{
        this.categoriesList = response.data;
        // console.log(this.categoriesList);
      }
    })

  }

  getCategorySubCategories(categoryId:string , categoryName:string):void
  {
    this.productService.getAllSubCategoriesOfCategory(categoryId).subscribe({
      next:(response)=>{
        // console.log(response.data);
        this.categorySubCategories = response.data;
        this.categoryName = categoryName;
      }
    })
  }

}
