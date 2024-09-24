"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlaneTakeoff, Sun, Moon, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Passenger {
  name: string;
  email: string;
  phone: string;
}

interface FlightInfo {
  source: string;
  destination: string;
}

interface FlightBookProps {
  flightId: string;
}

export function FlightBook({ flightId }: FlightBookProps) {
  const {toast}=useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: "", email: "", phone: "" },
  ]);
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulating API call to fetch flight details
    const fetchFlightDetails = async (flightId: string) => {

      try {
        const url = `http://localhost:8080/flights/${flightId}`;

        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flight details.");
        }

        const data = await response.json();
        setFlightInfo({
          source: data.source,
          destination: data.destination,
        });
      } catch (error) {
        console.error("Error:", error);
      } 
    };

    fetchFlightDetails(flightId);
  },[flightId]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePassengerCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(e.target.value);

    if (!e.target.value || isNaN(count) || count<1) {
      setPassengerCount(0);
      setPassengers(Array(0).fill({ name: "", email: "", phone: "" }));
      return;
    }
    setPassengerCount(count);
    setPassengers(Array(count).fill({ name: "", email: "", phone: "" }));
  };

  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", passengers);
    // Here you would typically send the data to your backend
    setIsLoading(true);
    const url = "http://localhost:8080/ticket/save";
    console.log(flightId);
    console.log(passengers);
    const body = JSON.stringify({
      flightId: flightId,
      passengers: passengers,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // ensures cookies are sent

        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error("Failed to save the ticket");
      }
      console.log(response);
      toast({
        title: "Get Set Fly",
        description: "Ticket Booked",
      });
      

      // After the ticket is successfully saved, navigate to seat selection
      router.push(`/book/seat-select/${flightId}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <PlaneTakeoff className="h-10 w-10 text-sky-500 mr-2" />
            <h1
              className={`text-3xl font-bold ${
                isDarkMode ? "text-sky-400" : "text-sky-600"
              }`}
            >
              SkyBooker
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
        </header>

        <Card
          className={`mb-6 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <CardContent className="py-4">
            {flightInfo ? (
              <div className="flex items-center justify-center space-x-4">
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {flightInfo.source}
                </span>
                <ArrowRight
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-sky-400" : "text-sky-600"
                  }`}
                />
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {flightInfo.destination}
                </span>
              </div>
            ) : (
              <p
                className={`text-center ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                Failed to load flight information.
              </p>
            )}
          </CardContent>
        </Card>

        <Card
          className={
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }
        >
          <CardHeader>
            <CardTitle
              className={isDarkMode ? "text-gray-100" : "text-gray-900"}
            >
              Ticket Booking Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="passengerCount"
                  className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                >
                  Number of Passengers
                </Label>
                <Input
                  id="passengerCount"
                  type="number"
                  min="1"
                  value={passengerCount}
                  onChange={handlePassengerCountChange}
                  className={`mt-1 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {passengers.map((passenger, index) => (
                <div key={index} className="space-y-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Passenger {index + 1}
                  </h3>
                  <div>
                    <Label
                      htmlFor={`name-${index}`}
                      className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      Name
                    </Label>
                    <Input
                      id={`name-${index}`}
                      value={passenger.name}
                      onChange={(e) =>
                        handlePassengerChange(index, "name", e.target.value)
                      }
                      className={`mt-1 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`email-${index}`}
                      className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      Email
                    </Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={passenger.email}
                      onChange={(e) =>
                        handlePassengerChange(index, "email", e.target.value)
                      }
                      className={`mt-1 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`phone-${index}`}
                      className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      Phone Number
                    </Label>
                    <Input
                      id={`phone-${index}`}
                      type="tel"
                      value={passenger.phone}
                      onChange={(e) =>
                        handlePassengerChange(index, "phone", e.target.value)
                      }
                      className={`mt-1 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="submit"
                className={`w-full ${
                  isDarkMode
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                Book Tickets
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
