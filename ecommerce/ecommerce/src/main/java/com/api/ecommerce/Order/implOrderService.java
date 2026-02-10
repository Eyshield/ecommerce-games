package com.api.ecommerce.Order;

import com.api.ecommerce.Cart.CartService;
import com.api.ecommerce.Common.PageResponse;
import com.api.ecommerce.Common.Status;
import com.api.ecommerce.Games.Game;
import com.api.ecommerce.Games.GameRepo;
import com.api.ecommerce.User.User;
import com.api.ecommerce.User.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
    public Order MakeOrder(Long cartId, String userId, List<OrderItemRequest> items, Status status) {
        User user = userRepo.findByKeycloakId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        verifyAndUpdateStock(items);
        if(cartId != null){
            cartService.clearCart(cartId);
        }
        if (status == null){
            status = Status.Processing;
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderItems(new ArrayList<>());
        order.setStatus(status);
        order.setDate(LocalDate.now());
        double totalPrice = 0.0;
        order = orderRepo.save(order);

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
    public PageResponse<OrderResponse> getOrders(Pageable pageable, String userId) {
        Long id = userRepo.findByKeycloakId(userId).orElseThrow(()->new RuntimeException("not found")).getId();
        Page<Order> orderPage = orderRepo.findByUserId(id, pageable);
        List<OrderResponse> responses = orderMapper.toOrderResponse(orderPage.getContent());

        return new PageResponse<>(
                responses,
                orderPage.getNumber(),
                orderPage.getSize(),
                orderPage.getTotalElements(),
                orderPage.getTotalPages(),
                orderPage.isFirst(),
                orderPage.isLast()
        );
    }

    @Override
    public Order updateOrder(Long orderId, List<OrderItemRequest> items,Status status) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        restoreStock(order.getOrderItems());
        verifyAndUpdateStock(items);

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
        order.setStatus(status);
        order.setTotalPrice(totalPrice);
        return orderRepo.save(order);
    }

    @Override
    public PageResponse<Order> getAllOrders(Pageable pageable) {
        Page<Order> orders=orderRepo.findAll(pageable);
        PageResponse<Order>response=new PageResponse<>(
                orders.getContent(),
                orders.getNumber(),
                orders.getSize(),
                orders.getTotalElements(),
                orders.getTotalPages(),
                orders.isFirst(),
                orders.isLast()
        );
        return response;
    }

    @Override
    public PageResponse<Order> searchOrderByUser(Pageable pageable, String nom) {
        Page<Order> orders=orderRepo.findByUser_NomContainingIgnoreCase(nom,pageable);
        PageResponse<Order>response=new PageResponse<>(
                orders.getContent(),
                orders.getNumber(),
                orders.getSize(),
                orders.getTotalElements(),
                orders.getTotalPages(),
                orders.isFirst(),
                orders.isLast()
        );
        return response;

    }
  //ideally these two function should be placed in game service but i don t care
    private void verifyAndUpdateStock(List<OrderItemRequest> items) {
        for (OrderItemRequest itemRequest : items) {
            Game game = gameRepo.findById(itemRequest.getGameId())
                    .orElseThrow(() -> new RuntimeException("Game not found: " + itemRequest.getGameId()));
            if (game.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficiant stock : " + game.getTitle() +
                        ". Stock avaible: " + game.getStock() +
                        ", Quantity demanded: " + itemRequest.getQuantity());
            }
            game.setStock(game.getStock() - itemRequest.getQuantity());
            gameRepo.save(game);
        }
    }private void restoreStock(Collection<OrderItem> orderItems) {
        for (OrderItem item : orderItems) {
            Game game = item.getGame();
            game.setStock(game.getStock() + item.getQuantity());
            gameRepo.save(game);
        }
    }




    @Override
    public void deleteOrder(Long id) {
        orderRepo.deleteById(id);
    }

    @Override
    public Double getTotal() {
        return orderRepo.getTotalRevenue();
    }
}
