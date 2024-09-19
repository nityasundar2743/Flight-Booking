package com.example.FlightBooking.controller;

import com.example.FlightBooking.entity.Flight;
import com.example.FlightBooking.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // Endpoint to create or update a flight
    @PostMapping("/add")
    public ResponseEntity<String> saveFlight(@RequestBody Flight flight) {
        flightService.saveFlight(flight);
        return new ResponseEntity<>("Flight saved successfully.", HttpStatus.CREATED);
    }

    // Endpoint to retrieve a flight by ID
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        Optional<Flight> flightOpt = flightService.getFlightById(id);
        if (flightOpt.isPresent()) {
            return new ResponseEntity<>(flightOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to retrieve all flights
    @GetMapping("/all")
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }
    
    @GetMapping("/get")
    public ResponseEntity<List<Flight>> getFlights(@RequestParam String source, 
    											   @RequestParam String destination){
    	List<Flight> flights = flightService.getFlights(source, destination);
    	if(flights.isEmpty())
    		return new ResponseEntity<>(flights, HttpStatus.NO_CONTENT);
    	
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    // Endpoint to delete a flight by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFlight(@PathVariable Long id) {
        if (flightService.getFlightById(id).isPresent()) {
            flightService.deleteFlight(id);
            return new ResponseEntity<>("Flight deleted successfully.", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Flight not found.", HttpStatus.NOT_FOUND);
        }
    }
}
