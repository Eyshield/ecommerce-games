import { CartItem } from './CartItem.models';

export interface Cart {
  id?: number;
  userId: number;
  totalPrice: number;
  items: CartItem[];
}
