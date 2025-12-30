import { OrderItem } from './OrderItem.models';

export interface orders {
  id?: number;
  userId: number;
  totalPrice: number;
  items: OrderItem[];
}
