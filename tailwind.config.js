/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        1: "#000",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
