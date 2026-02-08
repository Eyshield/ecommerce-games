package com.api.ecommerce.Cart;

import com.api.ecommerce.Common.PageResponse;
import com.api.ecommerce.Order.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@AllArgsConstructor
@RequestMapping("/api/cart")
@RestController
public class CartController {
    private CartService cartService;
    @PostMapping
    public ResponseEntity<Cart> makeCart(@RequestBody CartRequestDto cartRequestDto){
        try {

            return ResponseEntity.status(HttpStatus.CREATED).body(cartService.makeCart(cartRequestDto.getUserId(),cartRequestDto.getCartItemRequests()));
        }catch (Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/{userId}")
    public ResponseEntity<PageResponse<CartResponse>> getCart(@PathVariable String userId, @PageableDefault(page = 0,size = 10) Pageable pageable){
        try {
            return  ResponseEntity.status(HttpStatus.OK).body(cartService.getCarts(pageable,userId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart>updateCart(@PathVariable Long id, @RequestBody CartRequestDto cartRequestDto){
        try {
            return   ResponseEntity.status(HttpStatus.OK).body(cartService.updateCart(id,cartRequestDto.getCartItemRequests(),cartRequestDto.getUserId()));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
    @GetMapping("/{id}")
    public ResponseEntity<List<CartResponse>>getCartById(@PathVariable Long id){
        try {
            return   ResponseEntity.status(HttpStatus.OK).body(cartService.getCartById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @GetMapping
    public  ResponseEntity<PageResponse<Cart>> getAllCarts(@PageableDefault(size = 10, page = 0) Pageable pageable){
        try {
            return  ResponseEntity.status(HttpStatus.OK).body(cartService.getAllCarts(pageable));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/search")
    public ResponseEntity<PageResponse<Cart>> searchOrderByUser(@PageableDefault(size = 10, page = 0)Pageable pageable, @RequestParam(defaultValue = "")String nom){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(cartService.searchCartByUser(pageable,nom));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String>deleteCartById(@PathVariable Long id){
        try {
            return   ResponseEntity.status(HttpStatus.OK).body(cartService.clearCart(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }





}
