import { useState } from "react";
import { motion } from "framer-motion";

const Notebook = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {/* Container اصلی که کل کتاب را جابه‌جا می‌کند تا در مرکز بماند */}
      <motion.div
        className="relative w-[300px] h-[400px] cursor-pointer"
        animate={{ x: isOpen ? 150 : 0 }} // جابه‌جایی به راست به اندازه نصف عرض
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* صفحه ۲ (صفحه ثابت سمت راست که زیر جلد است) */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-white rounded-r-lg shadow-lg border-l border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800">صفحه ۲</h3>
            <hr className="my-2" />
            <p className="text-sm text-gray-600 leading-relaxed">
              این محتوای صفحه سمت راست است که پس از باز شدن جلد نمایان می‌شود.
            </p>
          </div>
        </div>

        {/* لایه متحرک: شامل "روی جلد" و "صفحه ۱" */}
        <motion.div
          className="absolute inset-0 z-10 origin-left"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isOpen ? -180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* روی جلد (Front Cover) */}
          <div
            className="absolute inset-0 bg-blue-800 rounded-lg flex flex-col items-center justify-center text-white shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="border-2 border-white/20 p-8 rounded-md flex flex-col items-center">
              <h2 className="text-2xl font-serif font-bold">دفترچه یادداشت</h2>
              <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
            </div>
            <p className="absolute bottom-6 text-xs opacity-60">کلیک کنید</p>
          </div>

          {/* صفحه ۱ (پشت جلد - وقتی باز می‌شود سمت چپ قرار می‌گیرد) */}
          <div
            className="absolute inset-0 bg-white rounded-l-lg shadow-inner p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)", // برگرداندن محتوا تا درست دیده شود
            }}
          >
            <h3 className="text-lg font-bold text-gray-800">صفحه ۱</h3>
            <hr className="my-2" />
            <p className="text-sm text-gray-600 leading-relaxed">
              این محتوای صفحه سمت چپ است. حالا کتاب کاملاً باز شده و دو صفحه
              کنار هم هستند.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Notebook;
