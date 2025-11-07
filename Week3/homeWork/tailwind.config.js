/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. 색상
      colors: {
        "primary-600": "#0A70EB",
        "primary-500": "#188CFF",
        "primary-400": "#28A6FF",
        "primary-300": "#50C4FF",
        "primary-200": "#B9E7FF",
        "primary-100": "#D7F1FF",
        "bg-white": "#F7F9FF",
        black: "#232323",
        white: "#FFFFFF",
      },
      // 2. 간격 및 여백
      spacing: {
        small: "0.5rem", // --spacing-small
        medium: "1rem",
        large: "2rem",
        xlarge: "3rem",
      },
      // 3. 폰트 크기
      fontSize: {
        base: "16px", // --font-size-base
        h1: "2.5rem",
        h2: "2rem",
        h3: "1.5rem",
        h4: "1.25rem",
      },
      // 4. 폰트 굵기 (Font Weight)
      fontWeight: {
        regular: "400", // --font-weight-regular
        medium: "500",
        bold: "700",
      },
      // 5. Border Radius
      borderRadius: {
        small: "0.25rem", // --border-radius-small
        medium: "0.5rem",
        large: "1rem",
      },
    },
  },
  plugins: [],
};

