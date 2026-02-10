import React from "react";

interface AirportBrief {
  iso3: string;
  airline?: string;
  city?: string;
}

interface FlightSummaryProps {
  flightClass?: string;
  departure: AirportBrief;
  arrival: AirportBrief;
  price: number;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({
  flightClass,
  departure,
  arrival,
  price,
}) => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full bg-white rounded-t-lg shadow-lg border-b border-gray-100 ">
        <div className="relative w-full   bg-white     overflow-hidden flex items-center p-8  ">
          {flightClass && (
            <div className="absolute left-0 top-0 w-40 h-40 overflow-hidden">
              <div className="absolute bg-red-600 text-white px-10 py-2 transform -rotate-45 -left-10 top-4 text-xl font-semibold shadow-md  tracking-wide first-letter:uppercase">
                {flightClass}
              </div>
            </div>
          )}

          <div className="flex-1 text-center">
            <span className="text-red-800 font-bold text-sm block mb-1">
              From
            </span>
            <h2 className="text-5xl font-extrabold text-gray-800 tracking-tighter">
              {departure.iso3}
            </h2>
            <p className="text-gray-500 text-sm mt-2 leading-tight">
              {departure.airline}
            </p>
          </div>

          <div className="flex-[0.5] flex flex-col items-center justify-center px-4">
            <div className="relative w-full flex items-center justify-center mb-6">
              <div className="absolute w-full border-t-2 border-dotted border-gray-300"></div>
              <div className="relative bg-white px-2">
                <svg
                  className="w-10 h-10 text-gray-400 transform rotate-90"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-4.5l8 2.5z" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-200 px-6 py-0 rounded-lg">
              <span className="text-2xl font-black text-gray-800">
                ${price}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center">
            <span className="text-red-800 font-bold text-sm block mb-1">
              To
            </span>
            <h2 className="text-5xl font-extrabold text-gray-800 tracking-tighter">
              {arrival.iso3}
            </h2>
            <p className="text-gray-500 text-sm mt-2 leading-tight">
              {arrival.airline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
