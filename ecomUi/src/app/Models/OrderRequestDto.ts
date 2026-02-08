import { orderItemRequest } from './OrderItemRequest.models';

export interface orderRequestDto {
  userId: string;
  cartId?: number;
  orderItemRequest: orderItemRequest[];
}
