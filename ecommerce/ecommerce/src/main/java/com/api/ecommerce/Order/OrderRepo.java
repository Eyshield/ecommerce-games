package com.api.ecommerce.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {
    Page<Order> findByUserId(Long id, Pageable pageable);
    Page<Order> findByUser_NomContainingIgnoreCase(String name, Pageable pageable);

}
