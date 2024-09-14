"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaneTakeoff, Clock, Users, Calendar } from 'lucide-react'
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision'

type TicketInfo = {
  confirmationId: string
  source: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  companyName: string
  passengers: {
    name: string
    email: string
    phone: string
  }[]
}

export function ViewTicket() {
  const [confirmationId, setConfirmationId] = useState('')
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchTicketInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call to fetch ticket info
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Sample ticket info
    setTicketInfo({
      confirmationId: confirmationId,
      source: 'New York (JFK)',
      destination: 'London (LHR)',
      departureTime: '2023-07-15 10:00 AM',
      arrivalTime: '2023-07-15 10:00 PM',
      duration: '7h 00m',
      companyName: 'SkyHigh Airlines',
      passengers: [
        { name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900' },
        { name: 'Jane Doe', email: 'jane@example.com', phone: '+1 234-567-8901' }
      ]
    })
    setIsLoading(false)
  }

  return (
    <BackgroundBeamsWithCollision className="min-h-screen bg-zinc-900 p-4 flex flex-col items-center">

      {!ticketInfo && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>View Your Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={fetchTicketInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confirmationId">Confirmation ID</Label>
                <Input
                  id="confirmationId"
                  value={confirmationId}
                  onChange={(e) => setConfirmationId(e.target.value)}
                  placeholder="Enter your confirmation ID"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'View Ticket'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {ticketInfo && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="bg-sky-500 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{ticketInfo.companyName}</h2>
                <PlaneTakeoff className="h-8 w-8" />
              </div>
              <p className="text-sm mt-2">Confirmation ID: {ticketInfo.confirmationId}</p>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-xl font-semibold">{ticketInfo.source}</p>
                </div>
                <PlaneTakeoff className="h-6 w-6 text-sky-500 mx-4" />
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="text-xl font-semibold">{ticketInfo.destination}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Departure
                  </p>
                  <p className="font-semibold">{ticketInfo.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Arrival
                  </p>
                  <p className="font-semibold">{ticketInfo.arrivalTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> Duration
                  </p>
                  <p className="font-semibold">{ticketInfo.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Users className="h-4 w-4 mr-2" /> Passengers
                  </p>
                  <p className="font-semibold">{ticketInfo.passengers.length}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Passenger Information</h3>
                {ticketInfo.passengers.map((passenger, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <p className="font-medium">{passenger.name}</p>
                    <p className="text-sm text-gray-500">{passenger.email}</p>
                    <p className="text-sm text-gray-500">{passenger.phone}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    {/* </div> */}
    </BackgroundBeamsWithCollision>
  )
}