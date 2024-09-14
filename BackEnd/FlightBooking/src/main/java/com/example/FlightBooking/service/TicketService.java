package com.example.FlightBooking.service;

import com.example.FlightBooking.entity.Ticket;
import com.example.FlightBooking.entity.User;
import com.example.FlightBooking.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Save a new ticket or update an existing one
    public void saveTicket(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    // Retrieve a ticket by its ID
    public Optional<Ticket> getTicketById(String confirmationID) {
        return ticketRepository.findById(confirmationID);
    }

    // Retrieve all tickets
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    
    // Retrieve all tickets for a user
    public List<Ticket> getTickets(User user) {
        return ticketRepository.findAllByUser(user);
    }

    // Delete a ticket by its ID
    public void deleteTicket(String confirmationID) {
        ticketRepository.deleteById(confirmationID);
    }
}
