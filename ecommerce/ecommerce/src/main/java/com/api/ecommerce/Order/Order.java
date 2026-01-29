package com.api.ecommerce.Order;

import com.api.ecommerce.Common.Status;
import com.api.ecommerce.User.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate date;
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnoreProperties("order")
    private Collection<OrderItem>orderItems=new ArrayList<>();
    @ManyToOne
    @JsonIgnoreProperties("order")
    private User user;
}
