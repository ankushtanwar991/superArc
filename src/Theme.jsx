import { createTheme } from "@mui/material";

export const Theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },

  palette: {
    primary: {
      main: "#000000",
    },

    themeDarkBlue: {
      main: "#0000ff",
    },

    themeLightBlue: {
      main: "#add8e6",
    },

    themeLightRed: {
      main: "#FFCCCB",
    },

    themeLightGreen: {
      main: "#90EE90",
    },

    themeYellow: {
      main: "#ffff00",
    },

    secondary: {
      main: "#808080",
    },

    themeWhite: {
      main: "#ffffff",
    },
  },
});
