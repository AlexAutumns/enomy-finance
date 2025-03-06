package com.enomyfinance.system.controller;

import com.enomyfinance.system.model.*;
import com.enomyfinance.system.service.*;
import com.enomyfinance.system.repository.*;
import com.enomyfinance.system.controller.*;

import com.enomyfinance.system.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Autowired
    private JWTService jwtService;

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<User> newUser(@RequestBody User user) {

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            System.out.println("Error: Password is null or empty!");
            return ResponseEntity.badRequest().body(null);
        }

        User newUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            Optional<User> optionalUser = userService.getUserByUsername(loginRequest.getUsername());

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }

            User user = optionalUser.get();
            boolean isAuthenticated = userService.authenticateUser(user.getUsername(), loginRequest.getPassword());

            if (isAuthenticated) {
                String token = jwtService.generateToken(user.getUsername());

                // Create a response object with user details
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("userId", user.getUserId());
                response.put("username", user.getUsername());
                response.put("name", user.getName());
                response.put("phone", user.getPhone());
                response.put("email", user.getEmail());
                response.put("accountStatus", user.getAccountStatus());
                response.put("role", user.getRole());
                response.put("isLoggedIn", true);


                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
        }
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/email/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userService.getUsersByRole(role);
    }

    @GetMapping("/settings") //Postman Query: GET /users/settings?activeSystemSettingsIDs=1,2,3
    public List<User> getUsersBySystemSettings(@RequestParam List<Long> activeSystemSettingsIDs) {
        return userService.getUsersBySystemSettings(activeSystemSettingsIDs);
    }
}
