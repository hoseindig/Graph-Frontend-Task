/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dash: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "12px 0" },
        },
      },
      animation: {
        dash: "dash 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
