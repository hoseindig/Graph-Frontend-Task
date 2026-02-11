import { useState } from "react";
import { motion } from "framer-motion";
import FlightDetails from "./FlightDetails";
import FlightSummary from "./FlightSummary";
import FlightFront from "./FlightFront";
import type { FlightCardProps } from "../types";

// format various time string inputs to 24-hour `HH:mm`
function formatTo24(timeStr: string) {
  if (!timeStr) return "";
  const s = timeStr.trim();

  // ISO datetime -> local time
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  // h:mm AM/PM or h:mmAM/PM
  const ampmMatch =
    s.match(/^(\d{1,2}):(\d{2})\s*([AaPp][.]? ?[Mm][.]?)$/) ||
    s.match(/^(\d{1,2})(:\d{2})?\s*([AaPp][.]? ?[Mm][.]?)$/);
  if (ampmMatch) {
    const h = parseInt(ampmMatch[1], 10);
    const mm = (ampmMatch[2] || ":00").replace(":", "").slice(0, 2);
    const ampm = ampmMatch[3].toLowerCase();
    let hour = h % 12;
    if (ampm.startsWith("p")) hour += 12;
    return `${String(hour).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  }

  // already H:MM or HH:MM
  const hhmm = s.match(/^(\d{1,2}):(\d{2})$/);
  if (hhmm) {
    const hh = String(parseInt(hhmm[1], 10)).padStart(2, "0");
    const mm = String(parseInt(hhmm[2], 10)).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  return s;
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  airlineLogo,
  logoStyle,
  departure,
  arrival,
  price,
  transfer,
  gates,
  seat,
  class: flightClass = "economy",
  duration,
  boarding,
  flightTimeRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center  p-4">
      {/* Main container - vertical shift to keep centered while opening */}
      <motion.div
        className="relative w-full h-[210px] cursor-pointer"
        animate={{ marginBottom: isOpen ? 200 : 0 }} // Move up by roughly half the card height
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Page 2 (static page underneath, now positioned in the upper half) */}
        <FlightSummary
          flightClass={flightClass}
          departure={{
            iso3: departure.iso3,
            airline: departure.airline,
            city: departure.city,
          }}
          arrival={{
            iso3: arrival.iso3,
            airline: arrival.airline,
            city: arrival.city,
          }}
          price={price}
        />

        {/* Moving layer: front cover and page 1 */}
        <motion.div
          className="absolute inset-0 z-10 origin-bottom" // Rotate around the bottom edge
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: isOpen ? -180 : 0 }} // Rotate around the X axis
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Front cover */}
          <FlightFront
            flightClass={flightClass}
            airline={airline}
            airlineLogo={airlineLogo}
            logoStyle={logoStyle}
            departure={{
              city: departure.city,
              time: formatTo24(departure.time),
              date: departure.date,
            }}
            arrival={{
              city: arrival.city,
              time: formatTo24(arrival.time),
              date: arrival.date,
            }}
            price={price}
          />

          {/* Page 1 (inside of the cover, sits at the bottom when opened) */}
          <div
            className="absolute inset-0 bg-white rounded-[22px] border-t-2 border-dashed border-gray-300 shadow-inner p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)", // Flip content around the X axis
            }}
          >
            <FlightDetails
              flightTimeRange={flightTimeRange}
              duration={duration}
              boarding={boarding}
              transfer={transfer}
              gates={gates}
              seat={seat}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlightCard;
