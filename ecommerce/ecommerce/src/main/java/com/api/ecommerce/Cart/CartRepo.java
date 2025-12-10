package com.api.ecommerce.Cart;

import com.api.ecommerce.Order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {
    Page<Cart> findByUserId(Long id, Pageable pageable);
}
