import { useState } from "react";
import { motion } from "framer-motion";

const NotebookDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      {/* Container اصلی - جابه‌جایی عمودی برای مرکز ماندن هنگام باز شدن */}
      <motion.div
        className="relative w-[300px] h-[400px] cursor-pointer"
        animate={{ y: isOpen ? -200 : 0 }} // جابه‌جایی به بالا به اندازه نصف ارتفاع
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* صفحه ۲ (صفحه ثابت که زیر است - حالا در نیمه بالایی قرار می‌گیرد) */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-white rounded-t-lg shadow-lg border-b border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800">صفحه ۲</h3>
            <hr className="my-2" />
            <p className="text-sm text-gray-600 leading-relaxed">
              این محتوای بخش بالایی است که ثابت می‌ماند.
            </p>
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
            className="absolute inset-0 bg-blue-800 rounded-lg flex flex-col items-center justify-center text-white shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="border-2 border-white/20 p-8 rounded-md flex flex-col items-center">
              <h2 className="text-2xl font-serif font-bold">دفترچه عمودی</h2>
              <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
            </div>
            <p className="absolute bottom-6 text-xs opacity-60">کلیک کنید</p>
          </div>

          {/* صفحه ۱ (پشت جلد - وقتی باز می‌شود در پایین قرار می‌گیرد) */}
          <div
            className="absolute inset-0 bg-white rounded-b-lg shadow-inner p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)", // برگرداندن محتوا حول محور X
            }}
          >
            <h3 className="text-lg font-bold text-gray-800">صفحه ۱</h3>
            <hr className="my-2" />
            <p className="text-sm text-gray-600 leading-relaxed">
              این محتوای بخش پایینی است که به سمت پایین باز شده است.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotebookDown;
