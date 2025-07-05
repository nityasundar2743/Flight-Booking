package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    // Additional query methods if needed

    // Example: Find a user by email
    Optional<Users> findByEmail(String email);
}
