import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { get } from "../api";
import type { FlightItem } from "../types/flight";

interface FlightsContextType {
  flights: FlightItem[];
  isLoading: boolean;
  page: number;
  pageNum: number;
  totalPages: number;
  pageSize: number;
  loadFlights: (page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
}

const FlightsContext = createContext<FlightsContextType | undefined>(undefined);

export const FlightsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [flights, setFlights] = useState<FlightItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const loadFlights = useCallback(
    async (pageNumber: number = 1) => {
      setPageNum(pageNumber);
      setIsLoading(true);
      try {
        const res = await get(`/list?page=${pageNumber}&size=${pageSize}`);
        if (!res.ok) {
          console.error("Failed to fetch flights:", res.error);
          return;
        }
        const newFlights = res.data.result as FlightItem[];
        setTotalPages(res.data.total / pageSize);
        if (pageNumber === 1) setFlights(newFlights);
        else setFlights((prev) => [...prev, ...newFlights]);
        setPage(pageNumber);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize],
  );

  const loadMore = useCallback(async () => {
    await loadFlights(page + 1);
  }, [loadFlights, page]);

  //   useEffect(() => {
  //     // initial load
  //     loadFlights(1);
  //   }, [loadFlights]);

  useEffect(() => {
    const handler = () => {
      loadFlights(1);
    };
    window.addEventListener("loadFlights", handler as EventListener);
    return () =>
      window.removeEventListener("loadFlights", handler as EventListener);
  }, [loadFlights]);

  const value: FlightsContextType = {
    flights,
    isLoading,
    page,
    pageNum,
    totalPages,
    pageSize,
    loadFlights,
    loadMore,
  };

  return (
    <FlightsContext.Provider value={value}>{children}</FlightsContext.Provider>
  );
};

export const useFlights = () => {
  const ctx = useContext(FlightsContext);
  if (!ctx) throw new Error("useFlights must be used within FlightsProvider");
  return ctx;
};
