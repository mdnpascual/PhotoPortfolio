import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { GlobalErrorBoundary } from "./components/error";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <BrowserRouter basename="/PhotoPortfolio">
        <App />
      </BrowserRouter>
    </GlobalErrorBoundary>
  </StrictMode>
);