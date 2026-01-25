package com.api.ecommerce.Games;

import com.api.ecommerce.Category.Category;
import com.api.ecommerce.Common.HomeSection;
import com.api.ecommerce.Common.Plateform;
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
    @Enumerated(EnumType.STRING)
    private Plateform plateform;
    private LocalDate releaseDate;
    private int stock;
    private String imageUrl;
    @Enumerated(EnumType.STRING)
    private HomeSection homeSection;
    @OneToMany(mappedBy = "game")
    @JsonIgnoreProperties("game")
    private Collection<OrderItem>orderItems=new ArrayList<>();
    @ManyToOne
    @JsonIgnoreProperties("games")
    private Category category;

}
