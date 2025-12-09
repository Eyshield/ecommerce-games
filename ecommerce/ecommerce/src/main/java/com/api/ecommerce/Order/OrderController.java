package com.api.ecommerce.Order;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
public class OrderController {
    private OrderService orderService;
    @PostMapping
    public ResponseEntity<Order>makeOrder(@RequestBody OrderRequestDto orderRequestDto){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(orderService.MakeOrder(orderRequestDto.getUserId(),orderRequestDto.getOrderItemRequest()));
        }catch (Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("{userId}")
    public ResponseEntity<PageResponse<OrderResponse>> getOrder(@PathVariable Long userId, @PageableDefault(page = 0,size = 10)Pageable pageable){
        try {
        return  ResponseEntity.status(HttpStatus.OK).body(orderService.getOrders(pageable,userId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order>updateOrder(@PathVariable Long id, @RequestBody List<OrderItemRequest> orderItemRequests){
        try {
          return   ResponseEntity.status(HttpStatus.OK).body(orderService.updateOrder(id,orderItemRequests));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }







}
