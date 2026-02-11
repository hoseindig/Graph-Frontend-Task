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
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);

  useEffect(() => {
    if (!isInitialLoad.current && !isLoading && pageNum > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    isInitialLoad.current = false;
  }, [pageNum, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoadMore = () => {
    loadMore();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-10">
      {flights.map((f, i) => {
        const dep = new Date(f.src.time);
        const arr = new Date(f.dst.time);
        const duration = calculateFlightDuration(dep, arr);
        const flightTimeRange = formatFlightTimeRange(dep, arr);
        // Generate stable key from flight data
        const flightKey = `${f.src.iso3}-${f.dst.iso3}-${f.src.time}-${i}`;

        return (
          <FlightCard
            key={flightKey}
            airline={`${f.src.airline} → ${f.dst.airline}`}
            airlineLogo={f.logoSrc}
            logoStyle={f.logoStyle}
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

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={scrollToTop}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            title="Scroll to top of page"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightListPage;
