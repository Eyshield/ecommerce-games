package com.api.ecommerce.User;

import com.api.ecommerce.Order.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String keycloakId;
    private String Username;
    private String email;
    private String nom;
    private String prenom;
    @OneToMany(mappedBy = "user")
    private Collection<Order>orders= new ArrayList<>();
}
