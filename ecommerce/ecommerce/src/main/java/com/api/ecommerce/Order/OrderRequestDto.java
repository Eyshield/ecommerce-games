package com.api.ecommerce.Order;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDto {
    private Long userId;
    private List <OrderItemRequest> orderItemRequest;
}
