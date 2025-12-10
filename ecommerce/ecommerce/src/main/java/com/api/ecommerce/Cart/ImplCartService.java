package com.api.ecommerce.Cart;

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
public class ImplCartService implements CartService {
    private CartRepo cartRepo;
    private CartItemRepo cartItemRepo;
    private UserRepo userRepo;
    private GameRepo gameRepo;
    private CartMapper cartMapper;
    @Override
    public Cart MakeCart(Long userId, List<CartItemRequest> items) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCartItems(new ArrayList<>());
        double totalPrice = 0.0;
        for (CartItemRequest itemRequest : items) {
            Game game = gameRepo.findById(itemRequest.getGameId())
                    .orElseThrow(() -> new RuntimeException("Game not found: " + itemRequest.getGameId()));

            CartItem cartItem = new CartItem();
            cartItem.setGame(game);
            cartItem.setQuantity(itemRequest.getQuantity());
            cartItem.setCart(cart);
            cartItemRepo.save(cartItem);
            cart.getCartItems().add(cartItem);

            totalPrice += game.getPrice() * cartItem.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        return cartRepo.save(cart);
    }

    @Override
    public PageResponse<CartResponse> getCarts(Pageable pageable, Long userId) {
        Page<Cart> cartPage = cartRepo.findByUserId(userId, pageable);
        List<CartResponse> responses = cartMapper.toCartResponse(cartPage.getContent());

        return new PageResponse<>(
                responses,
                cartPage.getNumber(),
                cartPage.getSize(),
                cartPage.getNumberOfElements(),
                cartPage.getTotalPages(),
                cartPage.isFirst(),
                cartPage.isLast()
        );
    }

    @Override
    public Cart updateCart(Long cartId, List<CartItemRequest> items) {
        Cart cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        List<CartItem> existingItems = new ArrayList<>(cart.getCartItems());
        for (CartItem item : existingItems) {
            cartItemRepo.delete(item);
        }
        cart.getCartItems().clear();
        double totalPrice = 0.0;
        for (CartItemRequest itemRequest : items) {
            Game game = gameRepo.findById(itemRequest.getGameId())
                    .orElseThrow(() -> new RuntimeException("Game not found: " + itemRequest.getGameId()));

            CartItem cartItem = new CartItem();
            cartItem.setGame(game);
            cartItem.setQuantity(itemRequest.getQuantity());
            cartItem.setCart(cart);
            cartItemRepo.save(cartItem);
            cart.getCartItems().add(cartItem);
            totalPrice += game.getPrice() * cartItem.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        return cartRepo.save(cart);
    }

    @Override
    public String clearCart(Long cartId) {
        try{
            cartRepo.deleteById(cartId);
            return "cart deleted";
        }catch (Exception e){
            return e.getMessage();
        }
    }
}
