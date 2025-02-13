package com.enomyfinance.system.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    private BigDecimal amount;
    private BigDecimal conversionFee;
    private String convertedCurrency;
    private String initialCurrency;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}