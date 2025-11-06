// src/styles/index.js
import { Global, css } from "@emotion/react";

export const theme = {
  colors: {
    primary: {
      500: "#188CFF",
      400: "#28A6FF",
      300: "#50C4FF",
      200: "#B9E7FF",
    },
    bg: {
      white: "#F7F9FF",
    },
    black: "#232323",
    white: "#FFFFFF",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: {
      base: "16px",
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.5rem",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
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
  breakpoints: {
    xs: "0",
    sm: "480px",
    md: "768px",
    lg: "1024px",
  },
};

export const GlobalStyles = () => (
  <Global
    styles={(emotionTheme) => css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: ${emotionTheme.typography.fontFamily};
        background: ${emotionTheme.colors.bg.white};
        height: 100vh;
      }

      button {
        cursor: pointer;
        border: none;
        outline: none;
      }

      #root {
        height: 100%;
      }
    `}
  />
);
