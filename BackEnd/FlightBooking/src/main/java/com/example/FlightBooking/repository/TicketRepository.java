package com.example.FlightBooking.repository;

import com.example.FlightBooking.entity.Ticket;
import com.example.FlightBooking.entity.Users;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {

	List<Ticket> findAllByUser(Users user);
    // You can add custom queries for tickets here if needed
}
