package com.enomyfinance.system.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;
    private String eventDetails;
    private String eventType;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
