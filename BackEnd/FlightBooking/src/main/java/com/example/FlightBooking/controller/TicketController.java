package com.example.FlightBooking.controller;

import com.example.FlightBooking.dto.TicketDTO;
import com.example.FlightBooking.dto.PassengerDTO;
import com.example.FlightBooking.entity.Flight;
import com.example.FlightBooking.entity.Passenger;
import com.example.FlightBooking.entity.Ticket;
import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.service.FlightService;
import com.example.FlightBooking.service.TicketService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private FlightService flightService;
    
    // Endpoint to create or update a ticket
    @PostMapping("/save")
    public ResponseEntity<String> saveTicket(@RequestBody TicketDTO ticketDTO, HttpSession session) {
    	System.out.println(ticketDTO.toString());
        List<PassengerDTO> passengerDTOList = ticketDTO.getPassengers();
        Long flightId = ticketDTO.getFlightId();
        Optional<Flight> flight = flightService.getFlightById(flightId);
        List<Passenger> passengerList = new ArrayList<Passenger>();

        if (flight.isEmpty()) {
            return new ResponseEntity<>("Flight not found.", HttpStatus.NOT_FOUND);
        }

        // Retrieve the logged-in user from the session
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return new ResponseEntity<>("User not logged in.", HttpStatus.UNAUTHORIZED);
        }
        
        Ticket ticket = new Ticket();
        
        for(PassengerDTO p : passengerDTOList) {
        	Passenger passenger = p.toPassenger();
        	passenger.setTicket(ticket);
        	passengerList.add(passenger);
        }

        ticket.setFlight(flight.get());
        ticket.setPassengers(passengerList);
        ticket.setUser(loggedInUser);  // Set the logged-in user
        ticket.setPassengerCount(passengerList.size());

        ticketService.saveTicket(ticket);
        return new ResponseEntity<>(ticket.getId(), HttpStatus.CREATED);
    }

    // Endpoint to retrieve a ticket by confirmation ID
    @GetMapping("/{confirmationID}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String confirmationID, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Optional<Ticket> ticketOpt = ticketService.getTicketById(confirmationID);
        if (ticketOpt.isPresent() && ticketOpt.get().getUser().getEmail().equalsIgnoreCase(loggedInUser.getEmail())) {
            return new ResponseEntity<>(ticketOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    // Endpoint to retrieve all tickets
    @GetMapping("/all")
    public ResponseEntity<List<Ticket>> getTickets(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Ticket> tickets = ticketService.getTickets(loggedInUser);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }
    
    // Endpoint to retrieve all tickets
    @GetMapping("/getall")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    // Endpoint to delete a ticket by confirmation ID
    @DeleteMapping("/{confirmationID}")
    public ResponseEntity<String> deleteTicket(@PathVariable String confirmationID) {
        if (ticketService.getTicketById(confirmationID).isPresent()) {
            ticketService.deleteTicket(confirmationID);
            return new ResponseEntity<>("Ticket deleted successfully.", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Ticket not found.", HttpStatus.NOT_FOUND);
        }
    }
}
