"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlaneTakeoff,
  Filter,
  ArrowUpDown,
  Search,
  ArrowLeft,
} from "lucide-react";
import { HoverEffect } from "./ui/card-hover-effect";
import { BackgroundGradient } from "./ui/background-gradient";

type Flight = {
  id: string;
  airline: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
};

export function Checkout() {
  const initialFlights: Flight[] = [
    {
      id: "1",
      airline: "SkyHigh Airlines",
      source: "New York",
      destination: "London",
      departure: "2023-07-01 10:00 AM",
      arrival: "2023-07-01 10:00 PM",
      duration: "7h 00m",
      cost: 500,
    },
    {
      id: "2",
      airline: "Ocean Air",
      source: "Los Angeles",
      destination: "Tokyo",
      departure: "2023-07-02 11:30 AM",
      arrival: "2023-07-03 3:30 PM",
      duration: "11h 00m",
      cost: 800,
    },
    {
      id: "3",
      airline: "Mountain Express",
      source: "Chicago",
      destination: "Paris",
      departure: "2023-07-03 9:15 AM",
      arrival: "2023-07-03 11:45 PM",
      duration: "8h 30m",
      cost: 650,
    },
    {
      id: "4",
      airline: "Desert Jet",
      source: "Dubai",
      destination: "Singapore",
      departure: "2023-07-04 2:00 PM",
      arrival: "2023-07-05 1:30 AM",
      duration: "7h 30m",
      cost: 550,
    },
    {
      id: "5",
      airline: "Arctic Airways",
      source: "Moscow",
      destination: "Beijing",
      departure: "2023-07-05 6:45 AM",
      arrival: "2023-07-05 7:15 PM",
      duration: "6h 30m",
      cost: 450,
    },
  ];

  const [flights, setFlights] = useState<Flight[]>(initialFlights);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);


  const searchFlights = async () => {
    const url = `http://localhost:8080/flights/get?source=${source}&destination=${destination}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch flights.");
      }
  
      const data = await response.json();
      console.log("data from server ",data);
      setFlights(data);
      setIsSearched(true)
    } catch (error) {
      console.error("Error:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const applyFilters = () => {
    let filteredFlights = initialFlights;

    if (sortBy === "cost") {
      filteredFlights.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === "departure") {
      filteredFlights.sort((a, b) =>
        a.departure.localeCompare(b.departure)
      );
    }

    setFlights(filteredFlights);
  };

  const handleBack = () => {
    setIsSearched(false);
    setFlights(initialFlights);
    setFilterSource("");
    setFilterDestination("");
    setSortBy("");
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between mb-8 ${
            isSearched ? "mt-4" : "mt-32"
          }`}
        >
          <div className="flex items-center">
            <PlaneTakeoff className="h-8 w-8 text-sky-500 mr-2" />
            <span className="text-2xl font-bold text-sky-500">SkyBooker</span>
          </div>
          {isSearched && (
            <div className="flex space-x-2">
              <Input
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-32"
              />
              <Input
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-32"
              />
              <Button onClick={searchFlights} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          )}
        </div>

        {!isSearched ? (
          <BackgroundGradient>
          <Card className="p-6 bg-zinc-800 text-white">
            <CardContent className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold text-sky-500">
                Find Your Flight
              </h2>
              <Input
                placeholder="Enter source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full max-w-sm"
              />
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full max-w-sm"
              />
              <Button
                onClick={searchFlights}
                disabled={loading}
                className="w-full max-w-sm"
              >
                {loading ? "Searching..." : "Search Flights"}
              </Button>
            </CardContent>
          </Card>
          </BackgroundGradient>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Flights</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 text-white">
                      <Label
                        htmlFor="filterSource"
                        className="text-right text-black"
                      >
                        Source
                      </Label>
                      <Input
                        id="filterSource"
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        placeholder="Enter source"
                        className="col-span-3 text-black placeholder-zinc-700 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 text-white">
                      <Label
                        htmlFor="filterSource"
                        className="text-right text-black"
                      >
                        Destination
                      </Label>
                      <Input
                        id="filterDestination"
                        value={filterDestination}
                        onChange={(e) => setFilterDestination(e.target.value)}
                        placeholder="Enter Destination"
                        className="col-span-3 text-black placeholder-zinc-700 bg-white"
                      />
                    </div>
                  </div>

                  <Button onClick={applyFilters}>Apply Filters</Button>
                </DialogContent>
              </Dialog>
              <Select onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white text-black">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost">Sort by Cost</SelectItem>
                  <SelectItem value="departure">Sort by Departure</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={applyFilters}>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Apply Sort
              </Button>
            </div>

            <div className="max-w-7xl mx-auto px-4">
              <HoverEffect flight={flights} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

