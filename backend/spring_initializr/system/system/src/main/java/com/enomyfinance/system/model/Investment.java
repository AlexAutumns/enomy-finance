package com.enomyfinance.system.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "investments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long investmentId;
    private LocalDateTime createdAt;
    private BigDecimal expectedMaxReturn;
    private BigDecimal initialLumpSum;
    private String investmentType;
    private BigDecimal monthlyInvestment;
    private BigDecimal totalFees;
    private BigDecimal totalTaxes;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
