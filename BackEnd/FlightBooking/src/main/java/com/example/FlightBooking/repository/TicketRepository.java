package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {
    // You can add custom queries for tickets here if needed
}
