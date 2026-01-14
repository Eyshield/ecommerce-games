import { OrderItem } from './OrderItem.models';
import { user } from './User.models';

export interface orders {
  id?: number;
  userId: number;
  user?: user;
  date: Date;
  totalPrice: number;
  items: OrderItem[];
}
