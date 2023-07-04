import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { ContextProvider } from "./Context";
import { Router } from "./Router";
import { Theme } from "./Theme";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ContextProvider>
      <ThemeProvider theme={Theme}>
        <Router />
      </ThemeProvider>
    </ContextProvider>
  </BrowserRouter>
);
