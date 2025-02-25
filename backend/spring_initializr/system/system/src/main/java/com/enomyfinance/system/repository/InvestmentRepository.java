package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    List<Investment> findByUser_UserId(Long userId);
    List<Investment> findByInvestmentType(String investmentType);
}