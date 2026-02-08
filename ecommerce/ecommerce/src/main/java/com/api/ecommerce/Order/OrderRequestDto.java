package com.api.ecommerce.Order;

import com.api.ecommerce.Common.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderRequestDto {
    private String userId;
    private Long cartId;
    @Enumerated(EnumType.STRING)
    private Status status;
    private List <OrderItemRequest> orderItemRequest;
}
