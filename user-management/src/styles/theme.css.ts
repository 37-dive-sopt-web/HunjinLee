import { createGlobalTheme } from "@vanilla-extract/css";

export const theme = createGlobalTheme(":root", {
  color: {
    primary500: "#188CFF",
    primary400: "#28A6FF",
    primary300: "#50C4FF",
    primary200: "#B9E7FF",
    bgWhite: "#F7F9FF",
    black: "#232323",
    white: "#FFFFFF",
  },
  fontSize: {
    base: "16px",
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.5rem",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
    xlarge: "3rem",
  },
  borderRadius: {
    small: "0.25rem",
    medium: "0.5rem",
    circle: "50%",
  },
  breakpoint: {
    xs: "0",
    sm: "480px",
    md: "768px",
    lg: "1024px",
  },
});
