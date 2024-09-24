package com.example.FlightBooking.controller;

import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.service.AuthService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, Object> requestBody, HttpSession session) {
        try {
            String name = (String) requestBody.get("name");
            String email = (String) requestBody.get("email");
            String password = (String) requestBody.get("password");
            
            // Register user
            User user = authService.registerUser(name, email, password);
            session.setAttribute("loggedInUser", user);
            
            // Prepare response with email
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully.");
            response.put("email", user.getEmail());
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint for user authentication
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody Map<String, Object> requestBody, 
                                                                HttpSession session) {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");

        // Authenticate user
        User user = authService.authenticateUser(email, password);
        
        if (user != null) {
            // Store authenticated user in session
            session.setAttribute("loggedInUser", user);
            
            // Prepare response with email
            Map<String, String> response = new HashMap<>();
            response.put("message", "User authenticated successfully.");
            response.put("email", user.getEmail());
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email or password.");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }
    
    @GetMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session){
    	User user = (User) session.getAttribute("loggedInUser");
        
        if (user != null) {
            // Store the authenticated user in the session
            authService.inValidateUser(session);
            return new ResponseEntity<>("User Logged Out successfully.", HttpStatus.OK);
        } else {
        	return new ResponseEntity<>("Something Went Wrong!", HttpStatus.BAD_REQUEST);
        }
    }
}
