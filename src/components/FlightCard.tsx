import React from "react";

interface FlightCardProps {
  airline: string;
  airlineLogo?: string;
  departure: {
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    city: string;
    time: string;
    date: string;
  };
  price: number;
  class?: "economy" | "business" | "first";
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  airlineLogo,
  departure,
  arrival,
  price,
  class: flightClass = "economy",
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-2xl">
      {/* Class Badge */}
      {flightClass && (
        <div className="absolute left-0 top-0 w-24 h-24 overflow-hidden">
          <div className="absolute bg-red-600 text-white px-10 py-1.5 transform -rotate-45 -left-8 top-4 text-xs font-semibold shadow-md uppercase tracking-wide">
            {flightClass}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        {/* Airline Logo & Name */}
        <div className="flex items-center gap-3">
          {airlineLogo ? (
            <img
              src={airlineLogo}
              alt={airline}
              width={200}
              className="w-52 object-contain"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
              </svg>
            </div>
          )}
          {/* <h2 className="text-2xl font-bold text-gray-900">{airline}</h2> */}
        </div>

        {/* Flight Details */}
        <div className="flex items-center gap-8">
          {/* Departure */}
          <div className="text-right">
            <p className="text-gray-500 text-sm mb-1">{departure.city}</p>
            <p className="text-4xl font-bold text-gray-900">{departure.time}</p>
            <p className="text-gray-400 text-sm mt-1">{departure.date}</p>
          </div>

          {/* Plane Icon */}
          <div className="text-gray-400">
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          {/* Arrival */}
          <div className="text-left">
            <p className="text-gray-500 text-sm mb-1">{arrival.city}</p>
            <p className="text-4xl font-bold text-gray-900">{arrival.time}</p>
            <p className="text-gray-400 text-sm mt-1">{arrival.date}</p>
          </div>
        </div>

        {/* Price */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg px-8 py-3">
          <p className="text-4xl font-bold text-gray-900">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
