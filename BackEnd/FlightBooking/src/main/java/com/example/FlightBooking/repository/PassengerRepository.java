package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // You can add custom queries here if needed
}
