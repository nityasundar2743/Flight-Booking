package com.example.FlightBooking.service;

import com.example.FlightBooking.entity.Flight;
import com.example.FlightBooking.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
	@Autowired
    private FlightRepository flightRepository;


    // Save a new flight or update an existing one
    public void saveFlight(Flight flight) {
        flightRepository.save(flight);
    }

    // Retrieve a flight by its ID
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    // Retrieve all flights
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Delete a flight by its ID
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
