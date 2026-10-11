import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const crawlerShell = document.getElementById("crawler-fallback");
if (crawlerShell) {
  crawlerShell.remove();
}

