package com.api.ecommerce.Order;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class OrderMapper {
    public  OrderResponse toOrderItemResponse(OrderItem orderItem) {
        return OrderResponse.builder()
                .gameId(orderItem.getGame().getId())
                .title(orderItem.getGame().getTitle())
                .imageUrl(orderItem.getGame().getImageUrl())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getGame().getPrice())
                .date(orderItem.getOrder().getDate())
                .status(orderItem.getOrder().getStatus())
                .subtotal(orderItem.getGame().getPrice() * orderItem.getQuantity())
                .build();
    }

    public List<OrderResponse> toOrderResponse(List<Order> orders) {
        return orders.stream()
                .flatMap(order -> order.getOrderItems().stream()
                        .map(this::toOrderItemResponse))
                .collect(Collectors.toList());
    }

}
