import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./index.css";
import App from "./App.tsx";

const raiz = document.getElementById("root");
if (!raiz) throw new Error("No está el nodo raíz.");

createRoot(raiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
