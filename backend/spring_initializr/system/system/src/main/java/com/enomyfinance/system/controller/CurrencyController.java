package com.enomyfinance.system.controller;

import com.enomyfinance.system.model.*;
import com.enomyfinance.system.service.*;
import com.enomyfinance.system.repository.*;
import com.enomyfinance.system.controller.*;

import com.enomyfinance.system.service.CurrencyService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/currencies")
@CrossOrigin
public class CurrencyController {
    @Autowired
    private CurrencyService currencyService;

    @GetMapping
    public List<Currency> getAllCurrencies() {
        return currencyService.getAllCurrencies();
    }

    @GetMapping("/{id}")
    public Optional<Currency> getCurrencyById(@PathVariable Long id) {
        return currencyService.getCurrencyById(id);
    }

    @PostMapping("/add")
    public Currency saveCurrency(@RequestBody Currency currency) {
        return currencyService.saveCurrency(currency);
    }

    @GetMapping("/code/{code}")
    public Optional<Currency> getCurrencyByCode(@PathVariable String code) {
        return currencyService.getCurrencyByCode(code);
    }
}
