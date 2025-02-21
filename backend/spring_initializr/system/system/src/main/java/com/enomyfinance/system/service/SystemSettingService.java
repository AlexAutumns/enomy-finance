package com.enomyfinance.system.service;

import com.enomyfinance.system.model.*;
import com.enomyfinance.system.service.*;
import com.enomyfinance.system.repository.*;
import com.enomyfinance.system.controller.*;

import com.enomyfinance.system.repository.SystemSettingRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@Service
public class SystemSettingService {
    @Autowired
    private SystemSettingRepository systemSettingRepository;

    public List<SystemSetting> getAllSettings() {
        return systemSettingRepository.findAll();
    }

    public Optional<SystemSetting> getSettingById(Long id) {
        return systemSettingRepository.findById(id);
    }

    public SystemSetting saveSetting(SystemSetting setting) {
        return systemSettingRepository.save(setting);
    }

    public Optional<SystemSetting> getSettingByName(String name) {
        return systemSettingRepository.findBySettingName(name);
    }
}
