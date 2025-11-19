import { style } from "@vanilla-extract/css";
import { theme } from "../styles/theme.css";

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${theme.spacing.medium} ${theme.spacing.large}`,
  backgroundColor: theme.color.primary300,
  color: theme.color.white,
});

export const userInfo = style({
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
});

export const nav = style({
  display: "flex",
  gap: theme.spacing.large,
  alignItems: "center",
});

export const navLink = style({
  color: "#dededeff",
  textDecoration: "none",
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  padding: `${theme.spacing.small} ${theme.spacing.medium}`,
  borderRadius: theme.borderRadius.small,
  transition: "background-color 0.2s ease",

  ":hover": {
    color: theme.color.white,
  },

  selectors: {
    "&.active": {
      fontWeight: theme.fontWeight.bold,
      color: theme.color.white,
    },
  },
});

export const button = style({
  color: "#dededeff",
  backgroundColor: "transparent",
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  padding: `${theme.spacing.small} ${theme.spacing.medium}`,
  borderRadius: theme.borderRadius.small,
  transition: "background-color 0.2s ease",

  ":hover": {
    color: theme.color.white,
  },
});