package com.enomyfinance.system.controller;

import com.enomyfinance.system.model.*;
import com.enomyfinance.system.service.*;
import com.enomyfinance.system.repository.*;
import com.enomyfinance.system.controller.*;

import com.enomyfinance.system.service.InvestmentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/investments")
@CrossOrigin(origins ="http://localhost:5173", allowCredentials = "true")
public class InvestmentController {
    @Autowired
    private InvestmentService investmentService;

    @Autowired
    private UserRepository userRepository;  // Add this

    @GetMapping("/{id}")
    public Optional<Investment> getInvestmentById(@PathVariable Long id) {
        return investmentService.getInvestmentById(id);
    }

    @PostMapping("/add")
    public Investment saveInvestment(@RequestBody Investment investment) {
        if (investment.getUser() == null || investment.getUser().getUserId() == null) {
            throw new IllegalArgumentException("User ID is required");
        }

        User user = userRepository.findById(investment.getUser().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));

        investment.setUser(user); // Assign fetched user
        investment.setTimestamp(LocalDateTime.now()); // Auto-generate timestamp

        return investmentService.saveInvestment(investment);
    }


    @GetMapping("/user/{userId}")
    public List<Investment> getInvestmentsByUserId(@PathVariable Long userId) {
        return investmentService.getInvestmentsByUserId(userId);
    }

    @GetMapping("/type/{type}")
    public List<Investment> getInvestmentsByType(@PathVariable String type) {
        return investmentService.getInvestmentsByType(type);
    }
}
