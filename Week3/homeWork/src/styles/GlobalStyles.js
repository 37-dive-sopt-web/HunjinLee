import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      // ← theme 받기
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: ${theme.typography.fontFamily};
        background: ${theme.colors.bg.white};
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

export default GlobalStyles;
