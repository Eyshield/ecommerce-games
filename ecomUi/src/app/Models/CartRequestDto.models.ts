import { cartItemRequest } from './CartItemRequest.models';

export interface cartRequestDto {
  userId: number;
  cartItemRequests: cartItemRequest[];
}
