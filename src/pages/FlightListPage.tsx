import React, { useEffect, useState } from "react";
import FlightCard from "../components/FlightCard";
import { useNavigate } from "react-router";
import { get } from "../api";

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
  price: string | number;
  class: "economy" | "business" | "first";
}

const FlightListPage: React.FC = () => {
  const navigate = useNavigate();

  const [flights, setFlights] = useState<any[]>([]);

  const getFlightList = async () => {
    try {
      const res = await get("/list?page=1&size=3");
      console.log(res);
      const flights = res.data.result;
      setFlights(flights);
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getFlightList();
  }, [navigate]);

  return (
    <div className=" space-y-20">
      {flights.length}
      {flights.map((f, i) => {
        const dep = new Date(f.src.time);
        const arr = new Date(f.dst.time);

        return (
          <FlightCard
            key={i}
            airline={`${f.src.airline} → ${f.dst.airline}`}
            airlineLogo={f.logoSrc}
            departure={{
              city: f.src.country,
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
              city: f.dst.country,
              time: arr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              date: arr.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            }}
            price={Number(f.price)}
            class={f.class}
          />
        );
      })}
    </div>
  );
};

export default FlightListPage;
