package com.example.FlightBooking.controller;

import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam String name, 
                                               @RequestParam String email, 
                                               @RequestParam String password) {
        try {
            User user = authService.registerUser(name, email, password);
            return new ResponseEntity<>("User registered successfully.", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint for user authentication
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestParam String email, 
                                                   @RequestParam String password) {
        boolean isAuthenticated = authService.authenticateUser(email, password);
        if (isAuthenticated) {
            return new ResponseEntity<>("User authenticated successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password.", HttpStatus.UNAUTHORIZED);
        }
    }
}
