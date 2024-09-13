import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  flight,
  className,
}: {
  flight: {
    // title: string;
    // description: string;
    // link: string;
    id: string;
    company: string;
    source: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    cost: number;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {flight.map((flight, idx) => (
        <Link
          href={"#"}
          key={flight?.id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
  key={flight.id}
  className="border border-white hover:border-pink-500 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
>
  <CardHeader>
    <CardTitle className="text-2xl">{flight.company}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-2">
      <div className="flex justify-between text-lg text-gray-500">
        <span className="font-semibold text-lg">{flight.source}</span>
        <span className="font-semibold text-lg">{flight.destination}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{flight.departureTime}</span>
        <span>{flight.arrivalTime}</span>
      </div>
      <div className="text-sm text-gray-500">Duration: {flight.duration}</div>
      <div className="text-lg font-bold text-green-600">${flight.cost}</div>
      <Button className="w-full mt-2">Book Now</Button>
    </div>
  </CardContent>
</Card>

        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
