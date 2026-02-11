import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { get } from "../api";
import type { FlightItem, FlightsContextType, ProviderProps } from "../types";

const FlightsContext = createContext<FlightsContextType | undefined>(undefined);

export const FlightsProvider: React.FC<ProviderProps> = ({ children }) => {
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

  // useEffect(() => {
  //   loadFlights(1);
  // }, [loadFlights]);

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
