import React from "react";
import type { FlightSummaryProps } from "../types";

const FlightSummary: React.FC<FlightSummaryProps> = ({
  flightClass,
  departure,
  arrival,
  price,
}) => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="relative w-full h-full bg-white rounded-[22px] shadow-lg overflow-hidden">
        <div className="relative w-full h-full bg-white flex items-center p-8">
          {flightClass && (
            <div className="absolute left-0 top-0 w-40 h-40 overflow-hidden">
              <div className="absolute bg-red-600 text-white px-10 py-2 transform -rotate-45 -left-10 top-4 text-xl font-semibold shadow-md tracking-wide first-letter:uppercase">
                {flightClass}
              </div>
            </div>
          )}

          <div className="flex-1 text-center">
            <span className="text-brand-900 font-bold text-xl block mb-1">
              From
            </span>
            <h2 className="text-5xl font-bold text-gray-800 tracking-tighter">
              {departure.iso3}
            </h2>
            <p className="text-gray-500 text-xl mt-2 leading-tight">
              {departure.airline}
            </p>
          </div>

          <div className="flex-[0.5] flex flex-col items-center justify-center px-4">
            <div className="relative w-full flex items-center justify-center mb-6">
              <div className="absolute w-full h-0.5 bg-[radial-gradient(circle,_#d1d5db_4px,_transparent_1.5px)] [background-size:12px_2px] animate-dash"></div>
              <div className="relative bg-white px-2">
                <img
                  src="/images/airplane.png"
                  alt="Flight path animation"
                  className="w-16 object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="w-full bg-gray-200 px-6 py-0 rounded-lg">
              <span className="text-3xl font-bold text-gray-800">${price}</span>
            </div>
          </div>

          <div className="flex-1 text-center">
            <span className="text-brand-900 font-bold text-xl block mb-1">
              To
            </span>
            <h2 className="text-5xl font-bold text-gray-800 tracking-tighter">
              {arrival.iso3}
            </h2>
            <p className="text-gray-500 text-xl mt-2 leading-tight">
              {arrival.airline}
            </p>
          </div>
        </div>
        `n{" "}
      </div>
    </div>
  );
};

export default FlightSummary;
