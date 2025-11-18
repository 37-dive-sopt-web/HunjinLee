import { style } from "@vanilla-extract/css";
import { theme } from "../styles/theme.css";


export const container = style({
  maxWidth: '600px',
  margin: '0 auto',
  padding: theme.spacing.xlarge,
});

export const title = style({
  fontSize: theme.fontSize.h2,
  fontWeight: theme.fontWeight.bold,
  color: theme.color.black,
  marginBottom: theme.spacing.large,
});

export const searchSection = style({
  marginBottom: theme.spacing.xlarge,
});

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.small,
  marginBottom: theme.spacing.medium,
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
  
  '::placeholder': {
    color: '#999',
  },
  
  ':focus': {
    borderColor: theme.color.primary500,
  },
});

export const button = style({
  width: '100%',
  padding: theme.spacing.medium,
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  backgroundColor: theme.color.primary500,
  color: theme.color.white,
  borderRadius: theme.borderRadius.medium,
  transition: 'background-color 0.3s ease',
  
  ':hover': {
    backgroundColor: theme.color.primary400,
  },
  
  ':disabled': {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
});

export const resultSection = style({
  padding: theme.spacing.large,
  borderRadius: theme.borderRadius.medium,
});

export const resultTitle = style({
  fontSize: theme.fontSize.h3,
  fontWeight: theme.fontWeight.bold,
  color: theme.color.black,
  marginBottom: theme.spacing.large,
});

export const resultRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing.medium} 0`,
  
  ':last-child': {
    borderBottom: 'none',
  },
});

export const resultLabel = style({
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.medium,
  color: '#666',
});

export const resultValue = style({
  fontSize: theme.fontSize.base,
  fontWeight: theme.fontWeight.regular,
  color: theme.color.black,
});
