package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    List<Investment> findByUserId(Long userId);
    List<Investment> findByInvestmentType(String investmentType);
    List<Investment> findByTotalFeesLessThan(Double maxFees);
    Optional<Investment> findTopByUserIdOrderByCreatedAtDesc(Long userId);
    List<Investment> findByExpectedMaxReturnGreaterThan(Double returnRate);
}