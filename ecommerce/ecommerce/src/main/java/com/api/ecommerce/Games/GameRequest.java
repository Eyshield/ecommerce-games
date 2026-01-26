package com.api.ecommerce.Games;

import com.api.ecommerce.Category.Category;
import com.api.ecommerce.Common.HomeSection;
import com.api.ecommerce.Common.Plateform;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    @Enumerated(EnumType.STRING)
    private Plateform plateform;
    private LocalDate releaseDate;
    @Enumerated(EnumType.STRING)
    private HomeSection homeSection;
    private int stock;
    private MultipartFile image;
    private Long categoryId;
}
