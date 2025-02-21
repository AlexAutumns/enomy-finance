package com.enomyfinance.system.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users") // Ensure it matches your database table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String accountStatus;
    private String email;
    private String name;
    private String password;
    private String phone;
    private String role;

    private Long[] activeSystemSettingsIDs;
}
