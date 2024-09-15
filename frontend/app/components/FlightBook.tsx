"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlaneTakeoff, ArrowRight } from 'lucide-react'
import { BackgroundGradient } from './ui/background-gradient'
import { useRouter } from 'next/navigation'

interface FlightBookProps {
  flightId: string;
}


type FlightDetails = {
  source: string
  destination: string
}

type Passenger = {
  name: string
  email: string
  phone: string
}

export function FlightBook({ flightId }: FlightBookProps) {
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null)
  const [passengerCount, setPassengerCount] = useState(1)
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: '', email: '', phone: '' }])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter();

  const bookTicketHandler = async () => {
    setIsLoading(true);
    const url = 'http://localhost:8080/ticket/save';
    const body = JSON.stringify({
      flightId: flightId,
      passengers: passengers,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error('Failed to save the ticket');
      }
      console.log(response)

      // After the ticket is successfully saved, navigate to seat selection
      router.push(`/book/seat-select/${flightId}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Simulating API call to fetch flight details
    const fetchFlightDetails = async (flightId:string) => {
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
          source: data.source,
          destination: data.destination,
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchFlightDetails(flightId)
  }, [flightId])

  const handlePassengerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value)
    setPassengerCount(count)
    setPassengers(prevPassengers => {
      const newPassengers = [...prevPassengers]
      if (count > prevPassengers.length) {
        for (let i = prevPassengers.length; i < count; i++) {
          newPassengers.push({ name: '', email: '', phone: '' })
        }
      } else if (count < prevPassengers.length) {
        newPassengers.splice(count)
      }
      return newPassengers
    })
  }

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    setPassengers(prevPassengers => {
      const newPassengers = [...prevPassengers]
      newPassengers[index] = { ...newPassengers[index], [field]: value }
      return newPassengers
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', { flightId, passengers })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <header className="flex justify-center items-center mb-6">
        <PlaneTakeoff className="h-8 w-8 text-sky-500 mr-2" />
        <span className="text-2xl font-bold text-sky-700">SkyBooker</span>
      </header>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-2xl font-bold text-sky-700"
            >
              {flightDetails?.source}
              <ArrowRight className="mx-2" />
              {flightDetails?.destination}
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="passengerCount">Number of Passengers</Label>
              <Input
                id="passengerCount"
                type="number"
                min="1"
                max="10"
                value={passengerCount}
                onChange={handlePassengerCountChange}
              />
            </div>

            {passengers.map((passenger, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold">Passenger {index + 1}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={passenger.email}
                      onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                    <Input
                      id={`phone-${index}`}
                      type="tel"
                      value={passenger.phone}
                      onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <Button type="submit" className="w-full">Confirm Booking</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Payment</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to proceed? This will redirect you to the Seat selection page
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={bookTicketHandler}>
                    Proceed
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}