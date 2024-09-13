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

type TicketBookingProps = {
  ticketId: string
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

export function TicketBook({ ticketId }: TicketBookingProps) {
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null)
  const [passengerCount, setPassengerCount] = useState(1)
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: '', email: '', phone: '' }])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to fetch flight details
    const fetchFlightDetails = async () => {
      setIsLoading(true)
      // In a real application, you would fetch the data from your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating network delay
      setFlightDetails({
        source: 'New York',
        destination: 'London'
      })
      setIsLoading(false)
    }

    fetchFlightDetails()
  }, [ticketId])

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
    console.log('Booking submitted:', { ticketId, passengers })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-sky-50 p-4">
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
                    Are you sure you want to proceed? This will redirect you to the Razorpay payment interface.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => alert('Redirecting to Razorpay...')}>
                    Proceed to Payment
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