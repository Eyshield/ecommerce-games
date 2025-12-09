package com.api.ecommerce.Order;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItemRequest {
    private Long gameId;
    private int quantity;
}
