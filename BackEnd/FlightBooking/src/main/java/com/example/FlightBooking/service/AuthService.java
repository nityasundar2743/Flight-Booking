package com.example.FlightBooking.service;

import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

	@Autowired
    private UserRepository userRepository;
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;


    // Register a new user
    public User registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(name, email, hashedPassword, null);
        return userRepository.save(user);
    }

    // Authenticate a user
    public boolean authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }
}
