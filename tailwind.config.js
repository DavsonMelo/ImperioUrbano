/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // ESSENCIAL
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
};

module.exports = config;
