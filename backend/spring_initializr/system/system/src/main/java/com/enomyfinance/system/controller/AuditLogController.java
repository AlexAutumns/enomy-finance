package com.enomyfinance.system.controller;

import com.enomyfinance.system.model.*;
import com.enomyfinance.system.service.*;
import com.enomyfinance.system.repository.*;
import com.enomyfinance.system.controller.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/audit-logs")
@CrossOrigin
public class AuditLogController {
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return auditLogService.getAllLogs();
    }

    @GetMapping("/{id}")
    public Optional<AuditLog> getLogById(@PathVariable Long id) {
        return auditLogService.getLogById(id);
    }

    @PostMapping("/add")
    public AuditLog saveLog(@RequestBody AuditLog auditLog) {
        return auditLogService.saveLog(auditLog);
    }

    @GetMapping("/user/{userId}")
    public List<AuditLog> getLogsByUserId(@PathVariable Long userId) {
        return auditLogService.getLogsByUserId(userId);
    }

    @GetMapping("/event-type/{eventType}")
    public List<AuditLog> getLogsByEventType(@PathVariable String eventType) {
        return auditLogService.getLogsByEventType(eventType);
    }
}
