package com.api.ecommerce.Order;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDto {
    private Long userId;
    private Long cartId;
    private List <OrderItemRequest> orderItemRequest;
}
