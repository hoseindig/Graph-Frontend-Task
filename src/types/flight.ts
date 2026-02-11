import React from "react";

export type AirportInfo = {
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
