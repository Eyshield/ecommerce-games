import { cartItemRequest } from './CartItemRequest.models';

export interface cartRequestDto {
  userId: number;
  cartItmeRequest: cartItemRequest[];
}
