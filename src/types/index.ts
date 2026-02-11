import type { CSSProperties, ReactNode } from "react";

export type AirportInfo = {
  country: string;
  iso3: string;
  time: string;
  airline: string;
};

export interface FlightItem {
  logoSrc: string;
  logoStyle?: CSSProperties;
  src: AirportInfo;
  dst: AirportInfo;
  boarding: string;
  transfer: boolean;
  gates: number;
  seat: string;
  price: string | number;
  class: "economy" | "business" | "first";
}

export interface User {
  username: string;
}

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface FlightsContextType {
  flights: FlightItem[];
  isLoading: boolean;
  page: number;
  pageNum: number;
  totalPages: number;
  pageSize: number;
  loadFlights: (page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animationDuration?: number;
  animateBackdrop?: boolean;
  animateModal?: boolean;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
}

export interface FlightCardAirport {
  city: string;
  time: string;
  date: string;
  iso3: string;
  airline: string;
}

export interface FlightCardProps {
  transfer: boolean;
  boarding: string;
  gates: number;
  seat: string;
  airline: string;
  airlineLogo?: string;
  logoStyle?: CSSProperties;
  departure: FlightCardAirport;
  arrival: FlightCardAirport;
  price: number;
  class?: "economy" | "business" | "first";
  duration?: string;
  flightTimeRange?: string;
}

export interface FlightDetailsProps {
  flightTimeRange?: string;
  duration?: string;
  boarding?: string;
  transfer?: boolean;
  gates?: number;
  seat?: string;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface AirportBrief {
  iso3: string;
  airline?: string;
  city?: string;
}

export interface FlightSummaryProps {
  flightClass?: string;
  departure: AirportBrief;
  arrival: AirportBrief;
  price: number;
}

export interface FrontAirport {
  city?: string;
  time?: string;
  date?: string;
  iso3?: string;
  airline?: string;
}

export interface FlightFrontProps {
  flightClass?: string;
  airline?: string;
  airlineLogo?: string;
  logoStyle?: CSSProperties;
  departure: FrontAirport;
  arrival: FrontAirport;
  price: number;
}

export type HTTPResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { status?: number; message: string; data?: any } };
