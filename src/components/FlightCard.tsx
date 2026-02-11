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
      {/* Container Ø§ØµÙ„ÛŒ - Ø¬Ø§Ø¨Ù‡â€ŒØ¬Ø§ÛŒÛŒ Ø¹Ù…ÙˆØ¯ÛŒ Ø¨Ø±Ø§ÛŒ Ù…Ø±Ú©Ø² Ù…Ø§Ù†Ø¯Ù† Ù‡Ù†Ú¯Ø§Ù… Ø¨Ø§Ø² Ø´Ø¯Ù† */}
      <motion.div
        className="relative w-full h-[210px] cursor-pointer"
        animate={{ marginBottom: isOpen ? 200 : 0 }} // Ø¬Ø§Ø¨Ù‡â€ŒØ¬Ø§ÛŒÛŒ Ø¨Ù‡ Ø¨Ø§Ù„Ø§ Ø¨Ù‡ Ø§Ù†Ø¯Ø§Ø²Ù‡ Ù†ØµÙ Ø§Ø±ØªÙØ§Ø¹
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* ØµÙØ­Ù‡ Û² (ØµÙØ­Ù‡ Ø«Ø§Ø¨Øª Ú©Ù‡ Ø²ÛŒØ± Ø§Ø³Øª - Ø­Ø§Ù„Ø§ Ø¯Ø± Ù†ÛŒÙ…Ù‡ Ø¨Ø§Ù„Ø§ÛŒÛŒ Ù‚Ø±Ø§Ø± Ù…ÛŒâ€ŒÚ¯ÛŒØ±Ø¯) */}
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

        {/* Ù„Ø§ÛŒÙ‡ Ù…ØªØ­Ø±Ú©: Ø±ÙˆÛŒ Ø¬Ù„Ø¯ Ùˆ ØµÙØ­Ù‡ Û± */}
        <motion.div
          className="absolute inset-0 z-10 origin-bottom" // Ú†Ø±Ø®Ø´ Ø­ÙˆÙ„ Ù„Ø¨Ù‡ Ù¾Ø§ÛŒÛŒÙ†ÛŒ
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: isOpen ? -180 : 0 }} // Ú†Ø±Ø®Ø´ Ø­ÙˆÙ„ Ù…Ø­ÙˆØ± X
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Ø±ÙˆÛŒ Ø¬Ù„Ø¯ (Front Cover) */}
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

          {/* ØµÙØ­Ù‡ Û± (Ù¾Ø´Øª Ø¬Ù„Ø¯ - ÙˆÙ‚ØªÛŒ Ø¨Ø§Ø² Ù…ÛŒâ€ŒØ´ÙˆØ¯ Ø¯Ø± Ù¾Ø§ÛŒÛŒÙ† Ù‚Ø±Ø§Ø± Ù…ÛŒâ€ŒÚ¯ÛŒØ±Ø¯) */}
          <div
            className="absolute inset-0 bg-white rounded-[22px] border-t-2 border-dashed border-gray-300 shadow-inner p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)", // Ø¨Ø±Ú¯Ø±Ø¯Ø§Ù†Ø¯Ù† Ù…Ø­ØªÙˆØ§ Ø­ÙˆÙ„ Ù…Ø­ÙˆØ± X
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

