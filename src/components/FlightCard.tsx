import { useState } from "react";
import { motion } from "framer-motion";
import FlightDetails from "./FlightDetails";
import FlightSummary from "./FlightSummary";
import FlightFront from "./FlightFront";

interface FlightCardProps {
  transfer: boolean;
  boarding: string;
  gates: number;
  seat: string;
  airline: string;
  airlineLogo?: string;
  departure: {
    city: string;
    time: string;
    date: string;
    iso3: string;
    airline: string;
  };
  arrival: {
    city: string;
    time: string;
    date: string;
    iso3: string;
    airline: string;
  };
  price: number;
  class?: "economy" | "business" | "first";
  duration?: string;
  flightTimeRange?: string;
}

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
      {/* Container اصلی - جابه‌جایی عمودی برای مرکز ماندن هنگام باز شدن */}
      <motion.div
        className="relative w-full h-[210px] cursor-pointer"
        animate={{ marginBottom: isOpen ? 200 : 0 }} // جابه‌جایی به بالا به اندازه نصف ارتفاع
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* صفحه ۲ (صفحه ثابت که زیر است - حالا در نیمه بالایی قرار می‌گیرد) */}
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

        {/* لایه متحرک: روی جلد و صفحه ۱ */}
        <motion.div
          className="absolute inset-0 z-10 origin-bottom" // چرخش حول لبه پایینی
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: isOpen ? -180 : 0 }} // چرخش حول محور X
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* روی جلد (Front Cover) */}
          <FlightFront
            flightClass={flightClass}
            airline={airline}
            airlineLogo={airlineLogo}
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

          {/* صفحه ۱ (پشت جلد - وقتی باز می‌شود در پایین قرار می‌گیرد) */}
          <div
            className="absolute inset-0 bg-white rounded-b-lg shadow-inner p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)", // برگرداندن محتوا حول محور X
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
