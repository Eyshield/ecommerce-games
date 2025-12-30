import { orderItemRequest } from './OrderItemRequest.models';

export interface orderRequestDto {
  userId: number;
  cartId: number;
  orderItemRequests: orderItemRequest[];
}
