import React from "react";

interface FlightDetailsProps {
  flightTimeRange?: string;
  duration?: string;
  boarding?: string;
  transfer?: boolean;
  gates?: number;
  seat?: string;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({
  flightTimeRange,
  duration,
  boarding,
  transfer,
  gates,
  seat,
}) => {
  return (
    <div className="grid grid-cols-3 gap-y-8 text-left">
      <div>
        <p className="text-xl font-bold text-gray-700">
          {flightTimeRange || "N/A"}
        </p>
        <p className="text-md text-gray-400 first-letter:uppercase">
          Flight Time
        </p>
      </div>
      <div>
        <p className="text-xl font-bold text-gray-700">{duration || "N/A"}</p>
        <p className="text-md text-gray-400 first-letter:uppercase">Duration</p>
      </div>
      <div>
        <p className="text-xl font-bold text-gray-700">{boarding || "N/A"}</p>
        <p className="text-md text-gray-400 first-letter:uppercase">Boarding</p>
      </div>

      <div>
        <p className="text-xl font-bold text-gray-700">
          {transfer ? "Yes" : "No"}
        </p>
        <p className="text-md text-gray-400 first-letter:uppercase">Transfer</p>
      </div>
      <div>
        <p className="text-xl font-bold text-gray-700">{gates}</p>
        <p className="text-md text-gray-400 first-letter:uppercase">Gate</p>
      </div>
      <div>
        <p className="text-xl font-bold text-gray-700">{seat}</p>
        <p className="text-md text-gray-400 first-letter:uppercase">Seat</p>
      </div>
    </div>
  );
};

export default FlightDetails;
