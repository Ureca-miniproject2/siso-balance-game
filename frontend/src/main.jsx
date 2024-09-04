import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
