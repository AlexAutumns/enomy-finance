package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserIdAndTimestampBetween(Long userId, LocalDateTime start, LocalDateTime end);
    List<Transaction> findByInitialCurrencyAndConvertedCurrency(String initialCurrency, String convertedCurrency);
    List<Transaction> findByAmountGreaterThanEqual(Double amount);
    List<Transaction> findByTimestampAfter(LocalDateTime timestamp);
}