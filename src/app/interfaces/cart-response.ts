import { CartResponseData } from "./cart-response-data";

export interface CartResponse {
  cartId: string,
  data: CartResponseData,
  numOfCartItems: number,
  status: string,
}
