import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlightCardProps {
  airline: string;
  airlineLogo?: string;
  departure: { city: string; time: string; date: string };
  arrival: { city: string; time: string; date: string };
  price: number;
  class?: "economy" | "business" | "first";
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
// ... تابع formatTo24 را در اینجا قرار دهید ...

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  airlineLogo,
  departure,
  arrival,
  price,
  class: flightClass = "economy",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col w-full  mb-4 drop-shadow-xl"
      style={{ perspective: "1000px" }}
    >
      {/* بخش اصلی و همیشگی (بخش بالا) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-20 bg-white px-10 cursor-pointer transition-all duration-300 ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        {flightClass && (
          <div className="absolute left-0 top-0 w-40 h-40 overflow-hidden">
            <div className="absolute bg-red-600 text-white px-10 py-2 transform -rotate-45 -left-10 top-4 text-lg font-semibold shadow-md  tracking-wide first-letter:uppercase">
              {flightClass}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-10">
          {/* Airline Logo & Name */}
          <div className="flex items-center gap-3">
            {airlineLogo ? (
              <img
                src={airlineLogo}
                alt={airline}
                width={200}
                className="w-56 object-contain"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
            )}
            {/* <h2 className="text-2xl font-bold text-gray-900">{airline}</h2> */}
          </div>

          {/* Flight Details */}
          <div className="flex items-center gap-8">
            {/* Departure */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">{departure.city}</p>
              <p className="text-4xl font-bold text-gray-900">
                {formatTo24(departure.time)}
              </p>
              <p className="text-gray-400 text-sm mt-1">{departure.date}</p>
            </div>

            {/* Plane Icon */}
            <div className="text-gray-400">
              <img src="/images/airplane.png" className="w-16 object-contain" />
            </div>

            {/* Arrival */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">{arrival.city}</p>
              <p className="text-4xl font-bold text-gray-900">
                {formatTo24(arrival.time)}
              </p>
              <p className="text-gray-400 text-sm mt-1">{arrival.date}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          {/* Price */}
          <div className="border-4 border-dashed border-gray-400 rounded-lg px-8 py-0">
            <p className="text-4xl font-bold text-gray-900">${price}</p>
          </div>
        </div>
      </div>

      {/* بخش تاشو (که از زیر بخش بالا باز می‌شود) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ rotateX: -90, opacity: 0, transformOrigin: "top" }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 bg-white rounded-b-2xl px-10 py-8 border-t border-dashed border-gray-300 shadow-inner"
          >
            {/* گرید اطلاعات طبق جدول مستند گراف */}
            <div className="grid grid-cols-3 gap-y-8 text-left">
              <div>
                <p className="text-xl font-bold text-gray-700">6:20 - 8:45</p>
                <p className="text-xs text-gray-400 uppercase">
                  Flight Time [cite: 143]
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">2h 25 min</p>
                <p className="text-xs text-gray-400 uppercase">
                  Duration [cite: 143]
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">5:35</p>
                <p className="text-xs text-gray-400 uppercase">
                  Boarding [cite: 143]
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-700">No</p>
                <p className="text-xs text-gray-400 uppercase">
                  Transfer [cite: 143]
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">8</p>
                <p className="text-xs text-gray-400 uppercase">
                  Gate [cite: 143]
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">20A</p>
                <p className="text-xs text-gray-400 uppercase">
                  Seat [cite: 143]
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightCard;
