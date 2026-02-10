import React, { useEffect, useState, useRef } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router";
import { get } from "../api";

// Helper function to calculate flight duration
function calculateFlightDuration(
  departureTime: Date,
  arrivalTime: Date,
): string {
  const durationMs = arrivalTime.getTime() - departureTime.getTime();
  const totalMinutes = Math.floor(durationMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}

// Helper function to format flight time range (e.g., "14:20 - 16:45")
function formatFlightTimeRange(departureTime: Date, arrivalTime: Date): string {
  const depHours = String(departureTime.getHours()).padStart(2, "0");
  const depMinutes = String(departureTime.getMinutes()).padStart(2, "0");
  const arrHours = String(arrivalTime.getHours()).padStart(2, "0");
  const arrMinutes = String(arrivalTime.getMinutes()).padStart(2, "0");
  return `${depHours}:${depMinutes} - ${arrHours}:${arrMinutes}`;
}

type AirportInfo = {
  country: string;
  iso3: string;
  time: string; // ISO string
  airline: string;
};

export interface FlightItem {
  logoSrc: string;
  logoStyle?: React.CSSProperties;
  src: AirportInfo;
  dst: AirportInfo;
  boarding: string;
  transfer: boolean;
  gates: number;
  seat: string;
  airline: string;
  price: string | number;
  class: "economy" | "business" | "first";
}

const FlightListPage: React.FC = () => {
  const navigate = useNavigate();

  const [flights, setFlights] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(3);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  const getFlightList = async (pageNumber: number = 1) => {
    setPageNum(pageNumber);
    try {
      setIsLoading(true);
      const res = await get(`/list?page=${pageNumber}&size=${pageSize}`);

      const newFlights = res.data.result;
      setTotalPages(res.data.total / pageSize);

      if (pageNumber === 1) {
        setFlights(newFlights);
      } else {
        setFlights((prevFlights) => [...prevFlights, ...newFlights]);
      }
      setPage(pageNumber);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      navigate("/login");
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    getFlightList(page + 1);
  };

  useEffect(() => {
    getFlightList(1);
  }, [navigate]);

  useEffect(() => {
    if (!isInitialLoad.current && !isLoading && pageNum > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    isInitialLoad.current = false;
  }, [pageNum, isLoading]);

  return (
    <div className=" space-y-10">
      {flights.map((f, i) => {
        const dep = new Date(f.src.time);
        const arr = new Date(f.dst.time);
        const duration = calculateFlightDuration(dep, arr);
        const flightTimeRange = formatFlightTimeRange(dep, arr);

        return (
          <FlightCard
            key={i}
            airline={`${f.src.airline} → ${f.dst.airline}`}
            airlineLogo={f.logoSrc}
            departure={{
              airline: f.src.airline,
              city: f.src.country,
              iso3: f.src.iso3,
              time: dep.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              date: dep.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            }}
            arrival={{
              airline: f.src.airline,
              city: f.dst.country,
              iso3: f.dst.iso3,
              time: arr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              date: arr.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            }}
            transfer={f.transfer}
            boarding={f.boarding}
            gates={f.gates}
            seat={f.seat}
            price={Number(f.price)}
            class={f.class}
            duration={duration}
            flightTimeRange={flightTimeRange}
          />
        );
      })}
      <div className="flex items-center justify-center pt-10" ref={bottomRef}>
        {totalPages === pageNum ? (
          <p>All Data was laoded</p>
        ) : (
          <button
            onClick={handleLoadMore}
            disabled={isLoading || totalPages === pageNum}
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlightListPage;
