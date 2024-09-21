package com.example.FlightBooking.service;

import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

	@Autowired
    private UserRepository userRepository;



    // Register a new user
    public User registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }
        String hashedPassword = password;
        User user = new User(name, email, hashedPassword, null);
        return userRepository.save(user);
    }

    // Authenticate a user and return the User object if successful
    public User authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        System.out.println(userOpt.get().getName());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (password.equals(user.getPassword())) {
                return user;  // Return the authenticated user
            }
        }
        return null;  // Return null if authentication fails
    }
    
    public void inValidateUser (HttpSession session) {
    	session.invalidate();
    	System.out.println("Session Invalidated Successfully!");
    }
}
