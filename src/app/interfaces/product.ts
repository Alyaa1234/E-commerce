import { Brand } from "./brand";
import { Category } from "./category";
import { SubCategory } from "./sub-category";

export interface Product {
  sold?: number,
  images?: string[],
  subcategory: SubCategory[],
  ratingsQuantity?: number,
  _id: string,
  title: string,
  description?: string,
  quantity: number,
  price?: number,
  imageCover: string,
  category: Category,
  brand: Brand,
  ratingsAverage: number,
}
