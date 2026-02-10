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

const sampleFlights: FlightItem[] = [
  {
    logoSrc: "logo/Lufthansa.png",
    logoStyle: { height: "51px", margin: "22px 12px" },
    src: {
      country: "Algeria",
      iso3: "DZA",
      time: "2021-05-28T09:35:11.523Z",
      airline: "Kempegowda International",
    },
    dst: {
      country: "United States of America",
      iso3: "USA",
      time: "2021-05-28T11:22:27.523Z",
      airline: "Indira Gandhi International",
    },
    boarding: "17017",
    transfer: false,
    gates: 5,
    seat: "20A",
    price: "3000",
    class: "economy",
  },
];

const FlightListPage: React.FC = () => {
  const navigate = useNavigate();

  const [flights, setFlights] = useState<any[]>([]);

  useEffect(() => {
    getFlightList();
  }, [navigate]);

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
  return (
    <div className=" space-y-4">
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
              date: dep.toLocaleDateString(),
            }}
            arrival={{
              city: f.dst.country,
              time: arr.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              date: arr.toLocaleDateString(),
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
