package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Additional query methods if needed

    // Example: Find a user by email
    Optional<User> findByEmail(String email);
}
