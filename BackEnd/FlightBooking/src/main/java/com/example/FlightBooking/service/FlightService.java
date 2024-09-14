package com.example.FlightBooking.service;

import com.example.FlightBooking.entity.Flight;
import com.example.FlightBooking.repository.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    private static final Logger logger = LoggerFactory.getLogger(FlightService.class);

    @Autowired
    private FlightRepository flightRepository;

    // Save a new flight or update an existing one
    public void saveFlight(Flight flight) {
        logger.info("Saving flight: {}", flight);
        flightRepository.save(flight);
    }

    // Retrieve a flight by its ID
    public Optional<Flight> getFlightById(Long id) {
        logger.info("Retrieving flight with ID: {}", id);
        return flightRepository.findById(id);
    }

    // Retrieve all flights
    public List<Flight> getAllFlights() {
        logger.info("Retrieving all flights");
        return flightRepository.findAll();
    }

    // Retrieve flights based on source and destination
    public List<Flight> getFlights(String source, String destination) {
        logger.info("Retrieving flights from source: {} to destination: {}", source, destination);
        return flightRepository.findBySourceAndDestination(source, destination);
    }

    // Delete a flight by its ID
    public void deleteFlight(Long id) {
        logger.info("Deleting flight with ID: {}", id);
        flightRepository.deleteById(id);
    }
}
