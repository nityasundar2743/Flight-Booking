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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> requestBody, HttpSession session) {
        try {
            String name = (String) requestBody.get("name");
            String email = (String) requestBody.get("email");
            String password = (String) requestBody.get("password");
            User user = authService.registerUser(name, email, password);
            session.setAttribute("loggedInUser", user);
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
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");
        User user = authService.authenticateUser(email, password);
        
        if (user != null) {
            // Store the authenticated user in the session
            session.setAttribute("loggedInUser", user);
            return new ResponseEntity<>("User authenticated successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password.", HttpStatus.UNAUTHORIZED);
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
