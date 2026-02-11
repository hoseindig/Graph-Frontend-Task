/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dash: {
          "100%": { backgroundPosition: "0 0" },
          "0%": { backgroundPosition: "12px 0" },
        },
      },
      animation: {
        dash: "dash 0.5s linear infinite",
      },
      colors: {
        brand: {
          900: "#3f3f3f",
        },
      },
    },
  },
  plugins: [],
};
