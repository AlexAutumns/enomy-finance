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

@RestController
@RequestMapping("/investments")
@CrossOrigin
public class InvestmentController {
    @Autowired
    private InvestmentService investmentService;

    @GetMapping
    public List<Investment> getAllInvestments() {
        return investmentService.getAllInvestments();
    }

    @GetMapping("/{id}")
    public Optional<Investment> getInvestmentById(@PathVariable Long id) {
        return investmentService.getInvestmentById(id);
    }

    @PostMapping("/add")
    public Investment saveInvestment(@RequestBody Investment investment) {
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
