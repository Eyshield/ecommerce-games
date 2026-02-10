package com.api.ecommerce.Order;

import com.api.ecommerce.Common.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@AllArgsConstructor
@Data
@SuperBuilder
public class OrderResponse {
    private Long gameId;
    private String title;
    private String imageUrl;
    private Integer quantity;
    private Double price;
    private LocalDate date;
    private Double subtotal;
    @Enumerated(EnumType.STRING)
    private Status status;
}
