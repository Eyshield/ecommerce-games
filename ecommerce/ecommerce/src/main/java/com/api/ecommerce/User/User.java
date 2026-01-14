package com.api.ecommerce.User;

import com.api.ecommerce.Order.Order;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;

@AllArgsConstructor
@Entity
@Data
@Table(name = "Users")
public class User {
    @Id
    private Long id;
    private String Username;
    private String email;
    private String nom;
    private String prenom;
    @OneToMany(mappedBy = "user")
    private Collection<Order>orders= new ArrayList<>();
}
