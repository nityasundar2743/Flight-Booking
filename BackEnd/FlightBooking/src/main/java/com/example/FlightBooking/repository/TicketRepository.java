package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Ticket;
import com.example.FlightBooking.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {

	List<Ticket> findAllByUser(User user);
    // You can add custom queries for tickets here if needed
}
