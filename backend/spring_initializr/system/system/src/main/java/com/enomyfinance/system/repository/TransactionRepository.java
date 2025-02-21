package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.Transaction;
import com.enomyfinance.system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Find transactions by User
    List<Transaction> findByUser(User user);

    // Find transactions by User ID
    List<Transaction> findByUser_UserId(Long userId);

    // Find transactions within a time range
    List<Transaction> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    // Find transactions for a specific currency
    List<Transaction> findByCurrencyCode(String currencyCode);

    // Find transactions above a certain amount
    List<Transaction> findByAmountGreaterThanEqual(Double amount);
}
