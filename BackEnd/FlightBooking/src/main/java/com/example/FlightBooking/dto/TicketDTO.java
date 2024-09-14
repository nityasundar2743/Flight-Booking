package com.example.FlightBooking.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TicketDTO {

    @JsonProperty("flightId")
    private Long id;
   
    @JsonProperty("passengers")
    private List<PassengerDTO> passengers;

	public Long getFlightId() {
		return id;
	}

	public void setFlightId(Long flightId) {
		this.id = flightId;
	}

	public List<PassengerDTO> getPassengers() {
		return passengers;
	}

	public void setPassengers(List<PassengerDTO> passengers) {
		this.passengers = passengers;
	}

	@Override
	public String toString() {
		return "TicketDTO [id=" + id + ", passengers=" + passengers + "]";
	}

}
