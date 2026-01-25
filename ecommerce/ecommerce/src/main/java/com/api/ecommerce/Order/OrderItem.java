package com.api.ecommerce.Order;

import com.api.ecommerce.Games.Game;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    @ManyToOne
    @JsonIgnoreProperties("orderItems")
    private Game game;
    @ManyToOne
    @JsonIgnoreProperties("orderItems")
    private Order order;
}
