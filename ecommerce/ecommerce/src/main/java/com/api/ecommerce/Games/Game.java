package com.api.ecommerce.Games;

import com.api.ecommerce.Category.Category;
import com.api.ecommerce.Order.OrderItem;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private double price;
    private String plateform;
    private LocalDate releaseDate;
    private int stock;
    private String imageUrl;
    @OneToMany(mappedBy = "game")
    private Collection<OrderItem>orderItems=new ArrayList<>();
    @ManyToOne
    @JsonIgnoreProperties("games")
    private Category category;

}
