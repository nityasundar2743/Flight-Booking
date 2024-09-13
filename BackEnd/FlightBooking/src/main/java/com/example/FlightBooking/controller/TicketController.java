package com.example.FlightBooking.controller;

import com.example.FlightBooking.entity.Ticket;
import com.example.FlightBooking.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    // Endpoint to create or update a ticket
    @PostMapping
    public ResponseEntity<String> saveTicket(@RequestBody Ticket ticket) {
        ticketService.saveTicket(ticket);
        return new ResponseEntity<>("Ticket saved successfully.", HttpStatus.CREATED);
    }

    // Endpoint to retrieve a ticket by confirmation ID
    @GetMapping("/{confirmationID}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String confirmationID) {
        Optional<Ticket> ticketOpt = ticketService.getTicketById(confirmationID);
        if (ticketOpt.isPresent()) {
            return new ResponseEntity<>(ticketOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to retrieve all tickets
    @GetMapping
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
