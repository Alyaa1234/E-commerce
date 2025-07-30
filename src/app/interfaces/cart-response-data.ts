import { CartResponseProduct } from "./cart-response-product";

export interface CartResponseData {
  cartOwner: string,
  products: CartResponseProduct[],
  totalCartPrice: number,
  _id: string,
}
