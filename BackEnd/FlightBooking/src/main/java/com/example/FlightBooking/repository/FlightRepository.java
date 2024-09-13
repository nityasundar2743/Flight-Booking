package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
