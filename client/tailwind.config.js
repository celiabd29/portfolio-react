/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-blue-500", "text-white", "text-3xl", "font-bold"],
  theme: {
    extend: {},
  },
  plugins: [],
};
