package com.example.FlightBooking.entity;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.security.SecureRandom;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @Column(name = "confirmation_id")
    private String id; // ID will be generated manually

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonProperty("user")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "flight_id", referencedColumnName = "id")
    @JsonProperty("flight")
    private Flight flight;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonProperty("passengers")
    private List<Passenger> passengers;

    @JsonProperty("passengerCount")
    private int passengerCount;
    
    
    //private String SeatNumber;

    public Ticket() {
        // Initialize passengers list if needed
    }

    @PrePersist
    public void generateRandomId() {
        this.id = generateRandomAlphanumericId(6);
    }

    private String generateRandomAlphanumericId(int length) {
        String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        SecureRandom RANDOM = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = RANDOM.nextInt(ALPHANUMERIC_STRING.length());
            sb.append(ALPHANUMERIC_STRING.charAt(index));
        }
        return sb.toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }

    public int getPassengerCount() {
        return passengerCount;
    }

    public void setPassengerCount(int passengerCount) {
        this.passengerCount = passengerCount;
    }
}
