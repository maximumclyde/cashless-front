import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, QueryProvider, router } from "@providers";
import { RouterProvider } from "react-router-dom";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);
