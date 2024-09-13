"use client";

import { useState } from "react";
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
import { PlaneTakeoff, Filter, ArrowUpDown } from "lucide-react";
import { HoverEffect } from "./ui/card-hover-effect";

// Flight type definition
type Flight = {
  id: string;
  company: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cost: number;
};

export function Checkout() {
  // Initial flight data
  const initialFlights: Flight[] = [
    {
      id: "1",
      company: "SkyHigh Airlines",
      source: "New York",
      destination: "London",
      departureTime: "2023-07-01 10:00 AM",
      arrivalTime: "2023-07-01 10:00 PM",
      duration: "7h 00m",
      cost: 500,
    },
    {
      id: "2",
      company: "Ocean Air",
      source: "Los Angeles",
      destination: "Tokyo",
      departureTime: "2023-07-02 11:30 AM",
      arrivalTime: "2023-07-03 3:30 PM",
      duration: "11h 00m",
      cost: 800,
    },
    {
      id: "3",
      company: "Mountain Express",
      source: "Chicago",
      destination: "Paris",
      departureTime: "2023-07-03 9:15 AM",
      arrivalTime: "2023-07-03 11:45 PM",
      duration: "8h 30m",
      cost: 650,
    },
    {
      id: "4",
      company: "Desert Jet",
      source: "Dubai",
      destination: "Singapore",
      departureTime: "2023-07-04 2:00 PM",
      arrivalTime: "2023-07-05 1:30 AM",
      duration: "7h 30m",
      cost: 550,
    },
    {
      id: "5",
      company: "Arctic Airways",
      source: "Moscow",
      destination: "Beijing",
      departureTime: "2023-07-05 6:45 AM",
      arrivalTime: "2023-07-05 7:15 PM",
      duration: "6h 30m",
      cost: 450,
    },
  ];

  const [flights, setFlights] = useState<Flight[]>(initialFlights);
  const [filterSource, setFilterSource] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [sortBy, setSortBy] = useState("");

  const applyFilters = () => {
    let filteredFlights = initialFlights;

    if (filterSource) {
      filteredFlights = filteredFlights.filter((flight) =>
        flight.source.toLowerCase().includes(filterSource.toLowerCase())
      );
    }

    if (filterDestination) {
      filteredFlights = filteredFlights.filter((flight) =>
        flight.destination
          .toLowerCase()
          .includes(filterDestination.toLowerCase())
      );
    }

    if (sortBy === "cost") {
      filteredFlights.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === "departure") {
      filteredFlights.sort((a, b) =>
        a.departureTime.localeCompare(b.departureTime)
      );
    }

    setFlights(filteredFlights);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="source" className="text-right">
                    Source
                  </Label>
                  <Input
                    id="source"
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destination" className="text-right">
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    value={filterDestination}
                    onChange={(e) => setFilterDestination(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </DialogContent>
          </Dialog>
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue
                placeholder="Sort by"
              />
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
      </header>

      <div className="max-w-8xl mx-auto px-8">
        <HoverEffect flight={flights} />
      </div>
    </div>
  );
}
