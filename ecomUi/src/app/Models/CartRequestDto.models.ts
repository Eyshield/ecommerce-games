import { cartItemRequest } from './CartItemRequest.models';

export interface cartRequestDto {
  userId: string;
  cartItemRequests: cartItemRequest[];
}
