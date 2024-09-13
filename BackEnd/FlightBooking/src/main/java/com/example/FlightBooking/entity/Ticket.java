package com.example.FlightBooking.entity;

import java.util.*;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("confirmationID")
    private String confirmationID;
    
    @ManyToOne
    @JoinColumn(name = "flight", referencedColumnName = "id")
    @JsonProperty("flight")
    private Flight flight;
    
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "passengers")
    @JsonProperty("passengers")
    private List<Passenger> passengers;

    public Ticket() {
        //this.confirmationID = UUID.randomUUID().toString();
    }

    public String getConfirmationID() {
        return confirmationID;
    }

    public void setConfirmationID(String confirmationID) {
        this.confirmationID = confirmationID;
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
}
