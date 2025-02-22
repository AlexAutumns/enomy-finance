package com.enomyfinance.system.controller;

import com.enomyfinance.system.model.*;
import com.enomyfinance.system.service.*;
import com.enomyfinance.system.repository.*;
import com.enomyfinance.system.controller.*;

import com.enomyfinance.system.service.SystemSettingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/system-settings")
@CrossOrigin
public class SystemSettingController {
    @Autowired
    private SystemSettingService systemSettingService;

    @GetMapping
    public List<SystemSetting> getAllSettings() {
        return systemSettingService.getAllSettings();
    }

    @GetMapping("/{id}")
    public Optional<SystemSetting> getSettingById(@PathVariable Long id) {
        return systemSettingService.getSettingById(id);
    }

    @PostMapping
    public SystemSetting saveSetting(@RequestBody SystemSetting setting) {
        return systemSettingService.saveSetting(setting);
    }

    @GetMapping("/name/{name}")
    public Optional<SystemSetting> getSettingByName(@PathVariable String name) {
        return systemSettingService.getSettingByName(name);
    }
}
