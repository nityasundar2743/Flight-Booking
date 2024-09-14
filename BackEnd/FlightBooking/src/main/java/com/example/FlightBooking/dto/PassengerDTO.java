package com.example.FlightBooking.dto;

import com.example.FlightBooking.entity.Passenger;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PassengerDTO {
	@JsonProperty("name")
    private String name;
	@JsonProperty("email")
    private String email;
	@JsonProperty("phone")
    private String phone;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public Passenger toPassenger() {
		Passenger passenger = new Passenger();
		passenger.setEmail(email);
		passenger.setName(name);
		passenger.setPhone(phone);
		return passenger;
	}
	
}
