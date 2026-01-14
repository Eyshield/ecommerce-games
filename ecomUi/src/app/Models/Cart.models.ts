import { CartItem } from './CartItem.models';
import { user } from './User.models';

export interface Cart {
  id?: number;
  userId: number;
  user?: user;
  date: Date;
  totalPrice: number;
  items: CartItem[];
}
