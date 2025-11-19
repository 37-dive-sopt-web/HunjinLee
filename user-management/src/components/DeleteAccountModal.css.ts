import { style } from "@vanilla-extract/css";
import { theme } from "../styles/theme.css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: theme.color.white,
  borderRadius: theme.borderRadius.medium,
  padding: theme.spacing.xlarge,
  maxWidth: "400px",
  width: "90%",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

export const title = style({
  fontSize: theme.fontSize.h3,
  fontWeight: theme.fontWeight.bold,
  color: theme.color.black,
  marginBottom: theme.spacing.medium,
  textAlign: "center",
});

export const description = style({
  fontSize: theme.fontSize.base,
  color: "#666",
  marginBottom: theme.spacing.xlarge,
  textAlign: "center",
});

export const buttonGroup = style({
  display: "flex",
  gap: theme.spacing.medium,
});

export const cancelButton = style({
  flex: 1,
  padding: theme.spacing.medium,
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  backgroundColor: "#f5f5f5",
  color: theme.color.black,
  borderRadius: theme.borderRadius.medium,
  transition: "background-color 0.3s ease",

  ":hover": {
    backgroundColor: "#e0e0e0",
  },
});

export const confirmButton = style({
  flex: 1,
  padding: theme.spacing.medium,
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  backgroundColor: "#FF6B6B",
  color: theme.color.white,
  borderRadius: theme.borderRadius.medium,
  transition: "background-color 0.3s ease",

  ":hover": {
    backgroundColor: "#FF5252",
  },
});
