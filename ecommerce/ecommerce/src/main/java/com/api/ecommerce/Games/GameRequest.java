package com.api.ecommerce.Games;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameRequest {
    private Long id;
    private String title;
    private String description;
    private double price;
    private String plateform;
    private LocalDate releaseDate;
    private int stock;
    private MultipartFile image;
}
