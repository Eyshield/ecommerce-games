package com.api.ecommerce.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    Page<User>findByNomContainingIgnoreCase(Pageable pageable,String nom);
    Optional<User> findByKeycloakId(String keycloakId);
}
