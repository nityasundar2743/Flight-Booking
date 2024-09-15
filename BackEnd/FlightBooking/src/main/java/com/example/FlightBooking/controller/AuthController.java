package com.example.FlightBooking.controller;

import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.service.AuthService;

import jakarta.servlet.http.HttpSession;

import java.util.Map;

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
    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> requestBody) {
        try {
        	String name = (String)requestBody.get("name");
        	String email = (String)requestBody.get("email");
        	String password = (String)requestBody.get("password");
            User user = authService.registerUser(name, email, password);
            return new ResponseEntity<>("User registered successfully.", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint for user authentication
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody Map<String, Object> requestBody, 
                                                   HttpSession session) {
        // Attempt to authenticate the user
    	String email = (String)requestBody.get("email");
    	String password = (String)requestBody.get("password");
        User authenticatedUser = authService.authenticateUser(email, password);
        
        if (authenticatedUser != null) {
            // Store the authenticated user in the session
            session.setAttribute("loggedInUser", authenticatedUser);
            return new ResponseEntity<>("User authenticated successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password.", HttpStatus.UNAUTHORIZED);
        }
    }
}
