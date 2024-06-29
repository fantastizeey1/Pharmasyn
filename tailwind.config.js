/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dash-backg": "url('./src/assets/dash-backg.jpg')",
      },
    },
  },
  plugins: [],
};
