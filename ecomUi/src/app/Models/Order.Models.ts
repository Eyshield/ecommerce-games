import { OrderItem } from './OrderItem.models';
import { user } from './User.models';

export interface orders {
  id?: number;
  userId: number;
  user?: user;
  date: Date;
  status: string;
  totalPrice: number;
  items: OrderItem[];
  subtotal?: number;
}
