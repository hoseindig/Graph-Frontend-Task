import { useState } from "react";
import { motion } from "framer-motion";

const Notebook = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Container اصلی با قابلیت Perspective برای سه بعدی نشان دادن */}
      <div
        className="relative w-[300px] h-[400px] cursor-pointer"
        style={{ perspective: "1500px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* صفحات داخلی (این بخش ثابت است و زیر جلد قرار دارد) */}
        <div className="absolute inset-0 flex shadow-2xl">
          <div className="w-1/2 h-full bg-white border-r border-gray-200 rounded-l-lg p-4">
            <h3 className="text-sm font-bold">صفحه ۱</h3>
            <p className="text-xs mt-2 text-gray-600">
              محتوای سمت راست دفتر اینجا قرار می‌گیرد.
            </p>
          </div>
          <div className="w-1/2 h-full bg-white rounded-r-lg p-4">
            <h3 className="text-sm font-bold">صفحه ۲</h3>
            <p className="text-xs mt-2 text-gray-600">
              محتوای سمت چپ دفتر اینجا قرار می‌گیرد.
            </p>
          </div>
        </div>

        {/* جلد دفتر که می‌چرخد */}
        <motion.div
          className="absolute inset-0 z-10 origin-left"
          initial={false}
          animate={{ rotateY: isOpen ? -180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* روی جلد */}
          <div
            className="absolute inset-0 bg-blue-700 rounded-lg flex items-center justify-center text-white shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center">
              <h2 className="text-xl font-bold">جلد دفتر</h2>
              <p className="text-sm opacity-80">برای باز کردن کلیک کنید</p>
            </div>
          </div>

          {/* پشت جلد (وقتی باز می‌شود این قسمت دیده می‌شود که معمولاً سفید یا همرنگ صفحات است) */}
          <div
            className="absolute inset-0 bg-gray-50 rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notebook;
