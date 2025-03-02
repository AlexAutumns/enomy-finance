package com.enomyfinance.system.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String accountStatus;
    private String email;
    private String name;
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Allows reading password in requests
    private String password;

    private String phone;
    private String role;

    @ManyToMany
    @JoinTable(
            name = "user_system_settings",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "setting_id")
    )
    private List<SystemSetting> activeSystemSettings;
}
