package com.enomyfinance.system.repository;

import com.enomyfinance.system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface SystemSettingRepository extends JpaRepository<SystemSetting, Long> {
    Optional<SystemSetting> findBySettingName(String settingName);
    boolean existsBySettingName(String settingName);
    List<SystemSetting> findBySettingNameContainingIgnoreCase(String keyword);
}