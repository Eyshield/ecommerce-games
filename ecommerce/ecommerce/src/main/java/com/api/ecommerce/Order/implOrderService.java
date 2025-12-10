package com.api.ecommerce.Order;

import com.api.ecommerce.Cart.CartService;
import com.api.ecommerce.Common.PageResponse;
import com.api.ecommerce.Games.Game;
import com.api.ecommerce.Games.GameRepo;
import com.api.ecommerce.User.User;
import com.api.ecommerce.User.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@AllArgsConstructor
public class implOrderService implements OrderService{
    private OrderRepo orderRepo;
    private OrderItemRepo orderItemRepo;
    private UserRepo userRepo;
    private GameRepo gameRepo;
    private OrderMapper orderMapper;
    private CartService cartService;
    @Override
    public Order MakeOrder(Long cartId,Long userId, List<OrderItemRequest> items) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cartService.clearCart(cartId);
        Order order = new Order();
        order.setUser(user);
        order.setOrderItems(new ArrayList<>());
        double totalPrice = 0.0;
        for (OrderItemRequest itemRequest : items) {
            Game game = gameRepo.findById(itemRequest.getGameId())
                    .orElseThrow(() -> new RuntimeException("Game not found: " + itemRequest.getGameId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setGame(game);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setOrder(order);
            orderItemRepo.save(orderItem);
            order.getOrderItems().add(orderItem);

            totalPrice += game.getPrice() * orderItem.getQuantity();
        }
        order.setTotalPrice(totalPrice);
        return orderRepo.save(order);
    }

    @Override
    public PageResponse<OrderResponse> getOrders(Pageable pageable, Long userId) {
        Page<Order> orderPage = orderRepo.findByUserId(userId, pageable);
        List<OrderResponse> responses = orderMapper.toOrderResponse(orderPage.getContent());

        return new PageResponse<>(
                responses,
                orderPage.getNumber(),
                orderPage.getSize(),
                orderPage.getNumberOfElements(),
                orderPage.getTotalPages(),
                orderPage.isFirst(),
                orderPage.isLast()
        );
    }

    @Override
    public Order updateOrder(Long orderId, List<OrderItemRequest> items) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        List<OrderItem> existingItems = new ArrayList<>(order.getOrderItems());
        for (OrderItem item : existingItems) {
            orderItemRepo.delete(item);
        }
        order.getOrderItems().clear();
        double totalPrice = 0.0;
        for (OrderItemRequest itemRequest : items) {
            Game game = gameRepo.findById(itemRequest.getGameId())
                    .orElseThrow(() -> new RuntimeException("Game not found: " + itemRequest.getGameId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setGame(game);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setOrder(order);
            orderItemRepo.save(orderItem);
            order.getOrderItems().add(orderItem);
            totalPrice += game.getPrice() * orderItem.getQuantity();
        }
        order.setTotalPrice(totalPrice);
        return orderRepo.save(order);
    }
}
