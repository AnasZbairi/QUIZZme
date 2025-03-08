module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src folder
  ],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        primary: "#1E40AF", // A custom blue color
        secondary: "#DB2777", // A custom pink color
        accent: "#F59E0B", // A custom orange color
        success: "#10B981", // A custom green color
        danger: "#EF4444", // A custom red color
      },

      // Custom Fonts
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Use Inter as the default sans-serif font
        mono: ["Fira Code", "monospace"], // Use Fira Code as the default monospace font
      },

      // Custom Spacing
      spacing: {
        72: "18rem", // Add a custom spacing value (72 = 18rem)
        84: "21rem", // Add another custom spacing value (84 = 21rem)
        96: "24rem", // Add another custom spacing value (96 = 24rem)
      },
    },
  },
  plugins: [], // Add Tailwind plugins here (e.g., forms, typography, etc.)
};
