"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plane,
  Search,
  Sun,
  Moon,
  ArrowLeft,
  PlaneTakeoff,
  CalendarIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface Flight {
  id: string;
  airline: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
}

interface Place{
  placeName:string;
  id:string;
}

export function Checkout() {
  const { toast } = useToast();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [date, setDate] = useState<Date>();
  const [sourceResults, setSourceResults] = useState<Place[]>([]);
  const [destResults, setDestResults] = useState<Place[]>([]);
  const [toId,setToId]=useState("")
  const [fromId,setFromId]=useState("")

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const popularJourneys = [
    { source: "New York", destination: "London" },
    { source: "Tokyo", destination: "Paris" },
    { source: "Dubai", destination: "Singapore" },
    { source: "Los Angeles", destination: "Sydney" },
    { source: "Mumbai", destination: "Bangkok" },
    { source: "Berlin", destination: "Rome" },
  ];


  const handleSearch = async (e: React.FormEvent) => {
    console.log("from id ",fromId)
    console.log("to id ",toId)
    e.preventDefault();
    const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/search-one-way?fromId=${fromId}&toId=${toId}&departDate=${date?.toISOString().split('T')[0]}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "10ffa9edf6msh1ef2d0c1b4f6438p1fda62jsna14460b93b1d",
        "x-rapidapi-host": "skyscanner80.p.rapidapi.com",
      },
    };
    console.log(url)
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Failed to fetch flights.");
      }

      const data = await response.json();

      const parsedFlights: Flight[] = data.data.itineraries.map((itinerary: any) => {
        const leg = itinerary.legs[0];
        return {
          id: itinerary.id,
          airline: leg.carriers.marketing.map((carrier: any) => carrier.name).join(", "),
          source: `${leg.origin.name} (${leg.origin.displayCode})`,
          destination: `${leg.destination.name} (${leg.destination.displayCode})`,
          departure: leg.departure,
          arrival: leg.arrival,
          duration: `${leg.durationInMinutes} minutes`,
          cost: itinerary.price.raw
        };
      });

      setFlights(parsedFlights);
    } catch (error) {
      toast({
        title: "Uh-oh! 🚧",
        description: "Something's broken in the background. We’re on it!",
      });
      console.error("Error:", error);
    } finally {
      setIsSearched(true);
    }
  };

  const handlePopularJourney = (src: string, dest: string) => {
    setSource(src);
    setDestination(dest);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBack = () => {
    setIsSearched(false);
    setFlights([]);
  };

  const handleSrcDest = async (place: string, isSrc: boolean) => {
    if (isSrc) {
      setSource(place);
    } else {
      setDestination(place);
    }
    console.log(date)

    const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=${encodeURIComponent(
      place
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "10ffa9edf6msh1ef2d0c1b4f6438p1fda62jsna14460b93b1d",
        "x-rapidapi-host": "skyscanner80.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      // Extract the suggestionTitle from the response and set the appropriate state
      const suggestions = result.data.map((item: any) => ({
        placeName: item.presentation.suggestionTitle,
        id: item.id,
      }));

      if (isSrc) {
        setSourceResults(suggestions); // Set source results
      } else {
        setDestResults(suggestions); // Set destination results
      }

      console.log("Suggestions: ", suggestions);
      console.log("Source result: ", sourceResults);
      console.log("Destination result: ", destResults);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const router = useRouter();

  const [isBooking, setIsBooking] = useState(false);

  const handleBookNow = async (flight: Flight) => {
    setIsBooking(true);
    router.push(`/book/${flight.id}`);
    setIsBooking(false);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 text-xl ${
        isDarkMode ? "bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <PlaneTakeoff className="h-10 w-10 text-sky-500 mr-2" />
              <h1
                className={`text-5xl font-bold mb-2 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                SkyBooker
              </h1>
            </div>
            <p
              className={
                isDarkMode ? "text-zinc-400 text-lg" : "text-zinc-600 text-lg"
              }
            >
              Find your perfect flight
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-5 w-5" />
          </div>
        </header>

        {!isSearched ? (
          <>
            <Card
              className={isDarkMode ? "bg-gray-800 text-white" : "bg-white"}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Search Flights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="From"
                      value={source}
                      onChange={(e) => handleSrcDest(e.target.value, true)}
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                    {sourceResults.length > 0 && (
                      <Card
                        className={`absolute z-10 w-full mt-1 ${
                          isDarkMode ? "bg-gray-700 text-white" : ""
                        }`}
                      >
                        <CardContent className="p-0">
                          {sourceResults.map((result, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className={`w-full justify-start ${
                                isDarkMode ? "hover:bg-gray-600" : ""
                              }`}
                              onClick={() => {
                                setSource(result.placeName);
                                setFromId(result.id)
                                setSourceResults([]);
                              }}
                            >
                              {result.placeName}
                            </Button>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="To"
                      value={destination}
                      onChange={(e) => handleSrcDest(e.target.value, false)}
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                    {destResults.length > 0 && (
                      <Card
                        className={`absolute z-10 w-full mt-1 ${
                          isDarkMode ? "bg-gray-700 text-white" : ""
                        }`}
                      >
                        <CardContent className="p-0">
                          {destResults.map((result, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className={`w-full justify-start ${
                                isDarkMode ? "hover:bg-gray-600" : ""
                              }`}
                              onClick={() => {
                                setDestination(result.placeName);
                                setToId(result.id);
                                setDestResults([]);
                              }}
                            >
                              {result.placeName}
                            </Button>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full sm:w-[180px] justify-start text-left font-normal ${
                          !date && "text-muted-foreground"
                        } ${
                          isDarkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={`w-auto p-0 ${
                        isDarkMode ? "bg-gray-700 text-white" : ""
                      }`}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={isDarkMode ? "bg-gray-700 text-white" : ""}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  className={`w-full ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={handleSearch}
                >
                  Search Flights
                </Button>
              </CardContent>
            </Card>

            <section>
              <h2
                className={`text-3xl font-semibold mb-4 ${
                  isDarkMode ? "text-zinc-200" : "text-zinc-800"
                }`}
              >
                Popular Journeys
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularJourneys.map((journey, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-32 py-4 px-6 flex items-center justify-between transition-transform duration-300 transform text-lg ${
                      isDarkMode
                        ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                        : "bg-white border-zinc-300 hover:bg-zinc-100 text-zinc-800"
                    } hover:scale-105`}
                    onClick={() =>
                      handlePopularJourney(journey.source, journey.destination)
                    }
                  >
                    <span className="flex items-center">
                      <span className="font-medium">{journey.source}</span>
                      <Plane
                        className={`w-5 h-5 mx-2 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <span className="font-medium">{journey.destination}</span>
                    </span>
                    <span
                      className={`text-lg ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Select
                    </span>
                  </Button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <Card
            className={`mb-8 text-lg ${
              isDarkMode
                ? "bg-zinc-800 border-zinc-700"
                : "bg-white border-zinc-200"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle
                className={isDarkMode ? "text-zinc-100" : "text-zinc-900"}
              >
                Flight Results: {source} to {destination}
              </CardTitle>
              <Button
                variant="outline"
                onClick={handleBack}
                className={isDarkMode ? "text-zinc-600" : "text-zinc-800"}
              >
                <ArrowLeft className="w-5 h-5 mr-2 " />
                Back to Search
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <Card
                    key={flight.id}
                    className={`h-32 transition-transform duration-300 transform hover:scale-105 ${
                      isDarkMode
                        ? "bg-zinc-700 border-zinc-600"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
                      <div>
                        <h3
                          className={`font-bold text-xl ${
                            isDarkMode ? "text-zinc-100" : "text-zinc-900"
                          }`}
                        >
                          {flight.airline}
                        </h3>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-zinc-400" : "text-zinc-600"
                          }`}
                        >
                          {flight.departure} - {flight.arrival}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <p
                          className={`font-medium text-lg ${
                            isDarkMode ? "text-zinc-200" : "text-zinc-800"
                          }`}
                        >
                          ${flight.cost}
                        </p>
                        <Button
                          onClick={() => handleBookNow(flight)}
                          disabled={isBooking}
                          className={`${
                            isDarkMode
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {isBooking ? (
                            <span>Booking...</span>
                          ) : (
                            <span>Book Now</span>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
