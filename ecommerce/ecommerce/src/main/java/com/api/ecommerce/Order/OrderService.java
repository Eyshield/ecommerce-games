package com.api.ecommerce.Order;

import com.api.ecommerce.Common.PageResponse;
import com.api.ecommerce.Common.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Order MakeOrder(Long cartId, Long userId, List<OrderItemRequest> items, Status status);
    PageResponse<OrderResponse> getOrders(Pageable pageable, Long userId);

    Order updateOrder(Long orderId, List<OrderItemRequest> items);

    PageResponse<Order>getAllOrders(Pageable pageable);

    PageResponse<Order>searchOrderByUser(Pageable pageable, String nom);

}
