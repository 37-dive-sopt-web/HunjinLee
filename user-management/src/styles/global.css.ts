import { globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

// CSS 리셋
globalStyle("*, *::before, *::after", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("body", {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: theme.fontSize.base,
  color: theme.color.black,
  backgroundColor: theme.color.bgWhite,
  lineHeight: 1.6,
  fontWeight: theme.fontWeight.regular,
});

globalStyle("input, button, textarea, select", {
  fontFamily: "inherit",
  fontSize: "inherit",
});

globalStyle("button", {
  cursor: "pointer",
  border: "none",
  outline: "none",
});

globalStyle("input", {
  outline: "none",
});
