package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByUserId(Long userId);
    List<AuditLog> findByEventType(String eventType);
    List<AuditLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    List<AuditLog> findByEventDetailsContainingIgnoreCase(String keyword);
}