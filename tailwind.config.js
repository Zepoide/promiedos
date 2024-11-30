/** @type {import('tailwindcss').Config} */

const tintColorLight = "#007618";
const tintColorDark = "#84DC7B";


module.exports = {

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          text: "#000000",
          primary: "#ffffff",
          secondary: "#F5F5F5",
          background: "#FAFAFA",
          tint: tintColorLight,
          icon: "#687076",
          tabIconDefault: "#687076",
          tabIconSelected: tintColorLight,
        },
        dark: {
          text: "#ECEDEE",
          primary: "#1B1B1B",
          secondary: "#262626",
          background: "#151718",
          tint: tintColorDark,
          icon: "#9BA1A6",
          tabIconDefault: "#9BA1A6",
          tabIconSelected: tintColorDark,
        },
      },
    },
    plugins: [],
  },

};
