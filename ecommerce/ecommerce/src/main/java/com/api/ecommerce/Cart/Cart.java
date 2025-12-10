package com.api.ecommerce.Cart;

import com.api.ecommerce.Order.OrderItem;
import com.api.ecommerce.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double totalPrice;
    @OneToMany(mappedBy = "cart")
    private Collection<CartItem> cartItems=new ArrayList<>();
    @ManyToOne
    private User user;
}
