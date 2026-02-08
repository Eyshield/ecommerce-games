package com.api.ecommerce.Cart;

import com.api.ecommerce.Common.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CartService {
    Cart makeCart(String userId, List<CartItemRequest> items);
    PageResponse<CartResponse> getCarts(Pageable pageable, String userId);

    Cart updateCart(Long cartId, List<CartItemRequest> items,String userId);
    String clearCart(Long cartId);

    PageResponse<Cart> getAllCarts(Pageable pageable);
   List <CartResponse> getCartById(Long id);
   PageResponse<Cart>searchCartByUser(Pageable pageable, String nom);


}
