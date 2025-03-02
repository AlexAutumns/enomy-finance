package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
    List<User> findByAccountStatus(String status);
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
    List<User> findByName(String name);
    Optional<User> findByUsername(String username);


    @Query("SELECT u FROM User u WHERE u.userId IN :ids")
    List<User> findUsersBySystemSettings(@Param("ids") List<Long> activeSystemSettingsIDs);
}
