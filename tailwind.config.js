/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#343434",
        gray: "#7A7A7A",
        grayLight: "#EDEDED",
        Neutral: "#312234",
        block: "#1C1C1E",
        white: "#ffffff",
      },
      flexBasis: {
        50: "50%",
        52: "52%",
        26: "26%",
        76: "76%",
        32: "32%",
        40: "40%",
        35: "35%",
        49: "49%",
        34: "34%",
        28: "28%",
        30: "30%",
        27: "27%",
        31: "31%",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },

  plugins: [],
};
