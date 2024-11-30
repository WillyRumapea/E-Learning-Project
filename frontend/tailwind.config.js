/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./pages/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        parkinsan: ["Parkinsans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
