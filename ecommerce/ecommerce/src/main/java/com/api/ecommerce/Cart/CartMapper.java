package com.api.ecommerce.Cart;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class CartMapper {
    public CartResponse toCartItemResponse(CartItem cartItem) {
        return CartResponse.builder()
                .gameId(cartItem.getGame().getId())
                .title(cartItem.getGame().getTitle())
                .imageUrl(cartItem.getGame().getImageUrl())
                .quantity(cartItem.getQuantity())
                .price(cartItem.getGame().getPrice())
                .subtotal(cartItem.getGame().getPrice() * cartItem.getQuantity())
                .build();
    }

    public List<CartResponse> toCartResponse(List<Cart> carts) {
        return carts.stream()
                .flatMap(cart -> cart.getCartItems().stream()
                        .map(this::toCartItemResponse))
                .collect(Collectors.toList());
    }
}
