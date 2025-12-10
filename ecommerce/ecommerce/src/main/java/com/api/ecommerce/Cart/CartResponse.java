package com.api.ecommerce.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Data
@SuperBuilder
public class CartResponse {
    private Long gameId;
    private String title;
    private String imageUrl;
    private Integer quantity;
    private Double price;
    private Double subtotal;
}
