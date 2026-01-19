package com.api.ecommerce.Cart;

import com.api.ecommerce.Common.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CartService {
    Cart MakeCart(Long userId, List<CartItemRequest> items);
    PageResponse<CartResponse> getCarts(Pageable pageable, Long userId);

    Cart updateCart(Long cartId, List<CartItemRequest> items);
    String clearCart(Long cartId);

    PageResponse<Cart> getAllCarts(Pageable pageable);
   List <CartResponse> getCartById(Long id);
}
