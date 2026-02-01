import { CartItem } from '../Models/CartItem.models';

export interface cartState {
  cartItems: CartItem[];
  totalPrice: number;
}
