module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        sm: [{ min: "320px", max: "500px" }],
        av: [{ min: "501px", max: "767px" }],
        lg: [{ min: "768px", max: "1022px" }],
        xl: "1023px",
      },
    },
  },
  plugins: [],
};
