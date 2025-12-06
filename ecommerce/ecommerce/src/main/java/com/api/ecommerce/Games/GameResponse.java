package com.api.ecommerce.Games;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class GameResponse {
    private Long id;
    private String title;
    private double price;
    private String imageUrl;
}
