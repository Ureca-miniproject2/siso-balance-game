import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
