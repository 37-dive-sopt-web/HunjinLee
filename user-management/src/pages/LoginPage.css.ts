import { style } from "@vanilla-extract/css";
import { theme } from "../styles/theme.css";

export const contaier = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: theme.spacing.large,
});

export const formWrapper = style({
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.large,
});

export const title = style({
  fontSize: theme.fontSize.h2,
  fontWeight: theme.fontWeight.bold,
  color: theme.color.black,
  textAlign: "center",
  marginBottom: theme.spacing.medium,
});

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.small,
});

export const label = style({
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  color: theme.color.black,
});

export const input = style({
  padding: theme.spacing.medium,
  fontSize: theme.fontSize.base,
  border: `1px solid ${theme.color.primary200}`,
  borderRadius: theme.borderRadius.medium,
  backgroundColor: theme.color.white,

  "::placeholder": {
    color: "#999",
  },

  ":focus": {
    borderColor: theme.color.primary500,
  },
});

export const button = style({
  padding: theme.spacing.medium,
  fontSize: theme.fontSize.base,
  backgroundColor: theme.color.primary400,
  color: theme.color.white,
  borderRadius: theme.borderRadius.medium,
});