package com.api.ecommerce.Cart;
import lombok.Data;

import java.util.List;
@Data
public class CartRequestDto {
    private Long userId;
    private List<CartItemRequest> cartItemRequests;
}
