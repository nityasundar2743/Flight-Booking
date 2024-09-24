"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaneTakeoff, Sun, Moon, Search, ArrowRight, Calendar, Clock, Users, ArrowLeft } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"

interface Passenger {
  name: string
  email: string
  phone: string
}

interface Flight {
  id: number;
  airline: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
}


interface TicketResponse {
  id: string;
  flight: Flight;
  passengers: Passenger[];
  passengerCount: number;
}

interface TransformedTicket {
  confirmationKey: string;
  airline: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
  passengers: {
    name: string;
    email: string;
    phone: string;
  }[];
}

interface Ticket {
  confirmationKey: string
  airline: string
  source: string
  destination: string
  departure: string
  arrival: string
  duration: string
  passengers: Passenger[],
  cost:number
}

export function ViewTicket() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  
    // Simulating API call to fetch tickets
    const fetchTickets = async () => {
      try {
        const url = `http://localhost:8080/ticket/all`;
  
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch flight details.");
        }
  
        const data: TicketResponse[] = await response.json();
  
        // Transform and set tickets
        const transformedTickets: TransformedTicket[] = data.map((ticket: TicketResponse) => ({
          confirmationKey: ticket.id, // Use the `id` as the confirmation key
          airline: ticket.flight.airline,
          source: ticket.flight.source,
          destination: ticket.flight.destination,
          departure: ticket.flight.departure,
          arrival: ticket.flight.arrival,
          duration: ticket.flight.duration,
          cost: ticket.flight.cost,
          passengers: ticket.passengers.map(passenger => ({
            name: passenger.name,
            email: passenger.email,
            phone: passenger.phone,
          })),
        }));
  
        setTickets(transformedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
  
    fetchTickets();
  }, []);
  

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(ticket => 
        ticket.confirmationKey.toLowerCase().includes(searchKey.toLowerCase()) ||
        ticket.source.toLowerCase().includes(searchKey.toLowerCase()) ||
        ticket.destination.toLowerCase().includes(searchKey.toLowerCase())
      )
    )
  }, [searchKey, tickets])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket)
  }

  const handleBack = () => {
    setSelectedTicket(null)
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <PlaneTakeoff className="h-10 w-10 text-sky-500 mr-2" />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>SkyBooker</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!selectedTicket ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>Upcoming Journeys</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search by confirmation key or destination"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      className={`flex-grow ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    />
                    <Button className={isDarkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-600 hover:bg-sky-700'}>
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card 
                    className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} cursor-pointer hover:shadow-lg transition-shadow duration-300`}
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <CardContent className="flex justify-between items-center p-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{ticket.source}</span>
                        <ArrowRight className={`h-4 w-4 ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                        <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{ticket.destination}</span>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{ticket.departure}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>Confirmation: {ticket.confirmationKey}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mx-auto"
            >
              <Button
                onClick={handleBack}
                className={`mb-4 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Journeys
              </Button>
              <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300`}>
                <div className={`${isDarkMode ? 'bg-sky-700' : 'bg-sky-500'} text-white p-6`}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{selectedTicket.airline}</h2>
                    <PlaneTakeoff className="h-8 w-8" />
                  </div>
                  <p className="text-sm mt-2">Confirmation ID: {selectedTicket.confirmationKey}</p>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>From</p>
                      <p className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{selectedTicket.source}</p>
                    </div>
                    <PlaneTakeoff className={`h-6 w-6 ${isDarkMode ? 'text-sky-400' : 'text-sky-500'} mx-4`} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>To</p>
                      <p className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{selectedTicket.destination}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Calendar className="h-4 w-4 mr-2" /> Departure
                      </p>
                      <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{`${selectedTicket.departure} `}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Calendar className="h-4 w-4 mr-2" /> Arrival
                      </p>
                      <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{`${selectedTicket.arrival} `}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Clock className="h-4 w-4 mr-2" /> Duration
                      </p>
                      <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{selectedTicket.duration}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Users className="h-4 w-4 mr-2" /> Passengers
                      </p>
                      <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{selectedTicket.passengers.length}</p>
                    </div>
                  </div>
                  <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Passenger Information</h3>
                    {selectedTicket.passengers.map((passenger, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{passenger.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{passenger.email}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{passenger.phone}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}