"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaneTakeoff, Clock } from "lucide-react";

type SeatBookingProps = {
  flightId: string;
};

type FlightDetails = {
  id: number;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  cost: number
};



export function SeatSelect({ flightId }: SeatBookingProps) {
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true)

  const [seats, setSeats] = useState<boolean[][]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  

  useEffect(() => {
    // Simulating API call to fetch ticket details and seat availability
    const fetchFlightDetails = async () => {
      // In a real application, you would fetch the data from your backend
      setIsLoading(true);
      
      try {
        const url = `http://localhost:8080/flights/${flightId}`;
        
        const response = await fetch(url, {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch flight details.");
        }
    
        const data = await response.json();
        setFlightDetails({
          id: data.id,
          source: data.source,
          destination: data.destination,
          departure: data.departure,
          arrival: data.arrival,
          cost: data.cost
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }

      // Generate random seat availability
      const generatedSeats = Array(30)
        .fill(null)
        .map(() =>
          Array(6)
            .fill(null)
            .map(() => Math.random() > 0.3)
        );
      setSeats(generatedSeats);
    };

    fetchFlightDetails();
  }, [flightId]);



  const handleSeatClick = (row: number, col: number) => {
    const seatIndex = row * 6 + col;
    const newSelectedSeats = selectedSeats.includes(seatIndex)
      ? selectedSeats.filter((seat) => seat !== seatIndex)
      : [...selectedSeats, seatIndex];
    setSelectedSeats(newSelectedSeats);

    if (flightDetails) {
      const newTotalCost = newSelectedSeats.reduce((total, seat) => {
        const row = Math.floor(seat / 6);
        return (
          total +
          (row < 10 ? flightDetails.cost*2 : flightDetails.cost)
        );
      }, 0);
      setTotalCost(newTotalCost);
    }
  };

  if (!flightDetails || seats.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <header className="flex justify-center items-center mb-6">
        <PlaneTakeoff className="h-8 w-8 text-sky-500 mr-2" />
        <span className="text-2xl font-bold text-sky-700">SkyBooker</span>
      </header>

      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {flightDetails.source} to {flightDetails.destination}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Departure: {flightDetails.departure}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Arrival: {flightDetails.arrival}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
        <div className="grid grid-cols-6 gap-2 mb-8">
          {seats.map((row, rowIndex) =>
            row.map((isAvailable, colIndex) => (
              <Button
                key={`${rowIndex}-${colIndex}`}
                className={`w-10 h-10 p-0 ${
                  !isAvailable
                    ? "bg-gray-300 cursor-not-allowed"
                    : rowIndex < 10
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } ${
                  selectedSeats.includes(rowIndex * 6 + colIndex)
                    ? "ring-2 ring-yellow-400"
                    : ""
                }`}
                disabled={!isAvailable}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              >
                {String.fromCharCode(65 + colIndex)}
                {rowIndex + 1}
              </Button>
            ))
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              Selected Seats: {selectedSeats.length}
            </p>
            <p className="text-sm text-gray-600">
              (Premium: ${flightDetails.cost*2}, Economy: $
              {flightDetails.cost})
            </p>
          </div>
          <p className="text-xl font-bold">Total Cost: ${totalCost}</p>
        </div>
        <Button className="w-full mt-4" disabled={selectedSeats.length === 0} >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
