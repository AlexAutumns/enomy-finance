package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    Optional<Currency> findByCurrencyCode(String currencyCode);
    Optional<Currency> findTopByCurrencyCodeOrderByLastUpdatedDesc(String currencyCode);
    List<Currency> findByExchangeRateGreaterThan(Double rate);
    List<Currency> findByCurrencyCodeIn(List<String> currencyCodes);
}