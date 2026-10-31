import { existsSync } from "node:fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

const archivos = ["hero.webp", "jornada.webp", "caso-el-nino-hoy.webp", "sebastian.webp"];

const imagenes = Object.fromEntries(
  archivos.map((archivo) => [archivo, existsSync(`public/img/${archivo}`)]),
);

const logo = existsSync("public/logo/exfutura.svg")
  ? "exfutura.svg"
  : existsSync("public/logo/exfutura.png")
    ? "exfutura.png"
    : "";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  define: {
    __IMAGENES__: JSON.stringify(imagenes),
    __LOGO__: JSON.stringify(logo),
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
