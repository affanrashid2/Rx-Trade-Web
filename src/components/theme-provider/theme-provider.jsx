"use client";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, responsiveFontSizes } from "@mui/material";

const MuiThemeProvider = ({ children }) => {
  let theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "san-serif"].join(","),
      Regular: 400,
      Medium: 500,
      SemiBold: 600,
      Bold: 700,
      ExtraBold: 900,
      button: {
        textTransform: "none",
      },
    },
    palette: {
      divider: "rgba(246, 246, 246, 1)",
      background: {
        default: "#F6F7FB",
      },
      mode: "light",
      primary: {
        main: "#236D7D",
      },
      secondary: {
        main: "#06B0BA",
        medium: "rgba(185, 251, 255, 1)",
        light: "#fff",
        dimLight: "#F3F3F3",
      },

      text: {
        secondary: "#3C3F43",
        lightGrey: "#C4C4C4",
        darkGrey: "rgba(102, 102, 102, 1)",
        heading: "#001646",
        icon: "rgba(232, 232, 233, 1)",
        success: "#06B0BA",
        danger: "#FF5252",
        paper: "#666666",
      },
      button: {
        light: "#06B0BA",
        background: "#B9FBFF",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
