package com.api.ecommerce.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

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
}
