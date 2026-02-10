import { useState } from "react";
import { motion } from "framer-motion";

interface FlightCardProps {
  transfer: boolean;
  boarding: string;
  gates: number;
  seat: string;
  airline: string;
  airlineLogo?: string;
  departure: { city: string; time: string; date: string; iso3: string };
  arrival: { city: string; time: string; date: string; iso3: string };
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
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* صفحه ۲ (صفحه ثابت که زیر است - حالا در نیمه بالایی قرار می‌گیرد) */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-white rounded-t-lg shadow-lg border-b border-gray-100 ">
            <div className="relative w-full   bg-white     overflow-hidden flex items-center p-8  ">
              {/* نوار قرمز گوشه (Economy Badge) */}
              {flightClass && (
                <div className="absolute left-0 top-0 w-40 h-40 overflow-hidden">
                  <div className="absolute bg-red-600 text-white px-10 py-2 transform -rotate-45 -left-10 top-4 text-lg font-semibold shadow-md  tracking-wide first-letter:uppercase">
                    {flightClass}
                  </div>
                </div>
              )}

              {/* بخش مبدا (From) */}
              <div className="flex-1 text-center">
                <span className="text-red-800 font-bold text-sm block mb-1">
                  From
                </span>
                <h2 className="text-5xl font-extrabold text-gray-800 tracking-tighter">
                  {departure.iso3}
                </h2>
                <p className="text-gray-500 text-sm mt-2 leading-tight">
                  {departure.airline}
                  {/* <br />
                  International */}
                </p>
              </div>

              {/* بخش میانی (هواپیما و قیمت) */}
              <div className="flex-[0.5] flex flex-col items-center justify-center px-4">
                <div className="relative w-full flex items-center justify-center mb-6">
                  {/* خط چین پشت هواپیما */}
                  <div className="absolute w-full border-t-2 border-dotted border-gray-300"></div>
                  {/* آیکون هواپیما */}
                  <div className="relative bg-white px-2">
                    <svg
                      className="w-10 h-10 text-gray-400 transform rotate-90"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-4.5l8 2.5z" />
                    </svg>
                  </div>
                </div>

                {/* باکس قیمت */}
                <div className="bg-gray-200 px-6 py-0 rounded-lg">
                  <span className="text-2xl font-black text-gray-800">
                    ${price}
                  </span>
                </div>
              </div>

              {/* بخش مقصد (To) */}
              <div className="flex-1 text-center">
                <span className="text-red-800 font-bold text-sm block mb-1">
                  To
                </span>
                <h2 className="text-5xl font-extrabold text-gray-800 tracking-tighter">
                  {arrival.iso3}
                </h2>
                <p className="text-gray-500 text-sm mt-2 leading-tight">
                  {arrival.airline}
                  {/* <br />
                  International */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* لایه متحرک: روی جلد و صفحه ۱ */}
        <motion.div
          className="absolute inset-0 z-10 origin-bottom" // چرخش حول لبه پایینی
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: isOpen ? -180 : 0 }} // چرخش حول محور X
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* روی جلد (Front Cover) */}
          <div
            className="absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-center text-white shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            {flightClass && (
              <div className="absolute left-0 top-0 w-40 h-40 overflow-hidden">
                <div className="absolute bg-red-600 text-white px-10 py-2 transform -rotate-45 -left-10 top-4 text-lg font-semibold shadow-md  tracking-wide first-letter:uppercase">
                  {flightClass}
                </div>
              </div>
            )}

            <div className="w-full flex items-center justify-between pt-10 px-8">
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
                  <img
                    src="/images/airplane.png"
                    className="w-16 object-contain"
                  />
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

          {/* صفحه ۱ (پشت جلد - وقتی باز می‌شود در پایین قرار می‌گیرد) */}
          <div
            className="absolute inset-0 bg-white rounded-b-lg shadow-inner p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)", // برگرداندن محتوا حول محور X
            }}
          >
            <div className="grid grid-cols-3 gap-y-8 text-left">
              <div>
                <p className="text-xl font-bold text-gray-700">
                  {flightTimeRange || "N/A"}
                </p>
                <p className="text-xs text-gray-400 uppercase">Flight Time</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">
                  {duration || "N/A"}
                </p>
                <p className="text-xs text-gray-400 uppercase">Duration</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">
                  {boarding || "N/A"}
                </p>
                <p className="text-xs text-gray-400 uppercase">Boarding</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-700">
                  {transfer ? "Yes" : "No"}
                </p>
                <p className="text-xs text-gray-400 uppercase">Transfer</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">{gates}</p>
                <p className="text-xs text-gray-400 uppercase">Gate</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">{seat}</p>
                <p className="text-xs text-gray-400 uppercase">Seat</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlightCard;
