import React, { useEffect, useRef } from "react";
import FlightCard from "../components/FlightCard";
import { useFlights } from "../context/FlightsContext";
import {
  calculateFlightDuration,
  formatFlightTimeRange,
} from "../utils/flightUtils";

const FlightListPage: React.FC = () => {
  const { flights, isLoading, totalPages, pageNum, loadMore } = useFlights();
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!isInitialLoad.current && !isLoading && pageNum > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    isInitialLoad.current = false;
  }, [pageNum, isLoading]);

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <div className="space-y-10">
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
              airline: f.dst.airline,
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
        {flights.length === 0 ? (
          <p>No flights available</p>
        ) : totalPages === pageNum ? (
          <p>All Data was loaded</p>
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
