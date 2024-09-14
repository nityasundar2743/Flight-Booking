package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Flight;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {

	List<Flight> findBySourceAndDestination(String source, String destination);
}
