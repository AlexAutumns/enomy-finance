package com.enomyfinance.system.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "investment")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long investmentId;

    private String investmentType;
    private String currencyCode;
    private Double initialLumpSum;
    private Double monthlyInvestment;
    private Double totalFees;
    private Double totalTaxes;
    private Double expectedMaxReturn;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
