import { Product } from "./product";

export interface CartResponseProduct {
  count: number,
  price: number,
  product: Product,
  _id: string,
}
