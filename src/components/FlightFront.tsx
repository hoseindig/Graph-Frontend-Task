import React from "react";

interface FrontAirport {
  city?: string;
  time?: string; // already formatted HH:mm
  date?: string;
  iso3?: string;
  airline?: string;
}

interface FlightFrontProps {
  flightClass?: string;
  airline?: string;
  airlineLogo?: string;
  departure: FrontAirport;
  arrival: FrontAirport;
  price: number;
}

const FlightFront: React.FC<FlightFrontProps> = ({
  flightClass,
  airline,
  airlineLogo,
  departure,
  arrival,
  price,
}) => {
  return (
    <div
      className="absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-between text-white shadow-2xl"
      style={{ backfaceVisibility: "hidden" }}
    >
      {flightClass && (
        <div className="absolute left-0 top-0 w-40 h-40 overflow-hidden">
          <div className="absolute bg-red-600 text-white px-10 py-2 transform -rotate-45 -left-10 top-4 text-lg font-semibold shadow-md  tracking-wide first-letter:uppercase">
            {flightClass}
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-between pt-10 px-14">
        <div className="flex items-center gap-3">
          {airlineLogo ? (
            <img
              src={airlineLogo}
              alt={airline}
              width={200}
              className="w-56 object-contain"
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
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-1">{departure.city}</p>
            <p className="text-5xl font-bold text-gray-900">{departure.time}</p>
            <p className="text-gray-400 text-lg mt-1">{departure.date}</p>
          </div>

          <div className="text-gray-400">
            <img src="/images/airplane.png" className="w-16 object-contain" />
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-lg mb-1">{arrival.city}</p>
            <p className="text-5xl font-bold text-gray-900">{arrival.time}</p>
            <p className="text-gray-400 text-lg mt-1">{arrival.date}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <div className="border-2 border-dashed border-gray-400 rounded-lg px-8 py-0">
          <p className="text-4xl font-bold text-gray-900">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightFront;
