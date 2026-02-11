import React from "react";

const professionalSkills = [
  "Vue",
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Nuxt.js",
  "Tailwind CSS",
  "SASS / SCSS",
  "Styled Components",
  "Material UI",
  "Ant Design",
  "State Managers",
  "Redux Toolkit",
  "Zustand",
  "React Query",
  "PWA",
  "Router",
  "React Hook Form",
  "JSON Schema",
  "REST API",
  "Authentication & Authorization",
  "MongoDB",
  "Mongoose",
  "SQL",
  "Docker",
  "CI/CD",
  "Webpack / Vite",
  "ESLint / Prettier",
  "Leaflet",
  "Chart.js",
  "Recharts",
  "Web Accessibility",
  "Responsive Design",
  "HTML5",
  "CSS3+",
  "ES6",
  "Express.js",
  "Git / GitHub / GitLab",
];

const experiences = [
  {
    title: "Senior Web Developer",
    company: "هلدینگ طرفه‌نگار (زنوا)",
    period: "۱۴۰۳ تا ۱۴۰۴",
    description:
      "توسعه و نگه‌داری سرویس‌های وب، بهبود عملکرد، بهینه‌سازی بارگذاری و رفع مشکلات فنی، مشارکت در طراحی معماری و پیاده‌سازی قابلیت‌های جدید.",
  },
  {
    title: "Senior Web Developer",
    company: "داریا همراه (واردکننده رسمی سامسونگ)",
    period: "۱۴۰۱ تا حالا",
    description:
      "توسعه سیستم‌های اصلی شرکت شامل Daria Seller، Daria Panel و Timey با React و TypeScript و کاهش ۲۵٪ زمان بارگذاری صفحات.",
  },
  {
    title: "Senior Web Developer",
    company: "ایرانتلت (هایــر کمپ)",
    period: "۱۴۰۱ تا ۱۴۰۲",
    description:
      "توسعه پلتفرم HireCamp (ATS) با Vue و پیاده‌سازی سیستم‌های مدیریت جذب و استخدام و HROS.",
  },
  {
    title: "Senior Web Developer",
    company: "عصر فناوری دانش",
    period: "۱۴۰۰ تا ۱۴۰۰",
    description:
      "توسعه پلتفرم فرابر و پیاده‌سازی ماژول‌های اصلی با Vue در ساختار ماژولار.",
  },
  {
    title: "Fullstack Developer (Vue / WCF)",
    company: "صفارایانه (پیمانکار شهرداری)",
    period: "۱۳۹۴ تا ۱۳۹۹",
    description:
      "طراحی و توسعه سامانه‌های خدمات شهروندی شهرداری شامل خدمات عمومی و اختصاصی.",
  },
  {
    title: "Fullstack Developer (PHP)",
    company: "پویا سازه کوهین",
    period: "۱۳۸۹ تا ۱۳۹۴",
    description:
      "توسعه سیستم مدیریت کارگاه‌های ساختمانی مبتنی بر PHP با پشتیبانی از هزاران تراکنش روزانه.",
  },
];

const About: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About</h2>

          <div className="space-y-2 text-slate-700 mb-8">
            <p className="text-sm sm:text-base">
              <span className="font-semibold text-slate-900">Email:</span>{" "}
              hossein.sheykhi.developer@gmail.com
            </p>
            <p className="text-sm sm:text-base">
              <span className="font-semibold text-slate-900">Phone:</span>{" "}
              0912-5771225
            </p>
          </div>

          <div className="space-y-3 mb-10 leading-8 text-slate-700">
            <p dir="rtl">
              توسعه‌دهنده ارشد Front-End با تخصص در Vue.js و React.js و تجربه‌ی
              گسترده در طراحی و پیاده‌سازی سامانه‌های تحت وب.
            </p>
            <p dir="rtl">
              دارای سابقه‌ی فعالیت به‌عنوان توسعه‌دهنده فول‌استک، اما با تمرکز
              ویژه بر توسعه‌ی فرانت‌اند در سال‌های اخیر.
            </p>
            <p dir="rtl">
              به یادگیری مداوم، حل مسائل پیچیده و بهبود تجربه‌ی کاربری علاقه‌مندم
              و در پروژه‌های شخصی و تجاری نیز از Node.js به‌طور کامل استفاده
              کرده‌ام.
            </p>
          </div>

          <section className="mb-10">
            <h3 className="text-xl font-semibold text-slate-900 mb-4" dir="rtl">
              مهارت‌های حرفه‌ای
            </h3>
            <div className="flex flex-wrap gap-2">
              {professionalSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-slate-900 mb-4" dir="rtl">
              سوابق کاری
            </h3>
            <div className="space-y-4">
              {experiences.map((job) => (
                <article
                  key={`${job.company}-${job.period}`}
                  className="rounded-xl border border-slate-200 p-4 bg-slate-50"
                  dir="rtl"
                >
                  <h4 className="font-semibold text-slate-900">{job.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {job.company} | {job.period}
                  </p>
                  <p className="text-slate-700 mt-2 leading-7">
                    {job.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
