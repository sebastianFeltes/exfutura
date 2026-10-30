import { existsSync } from "node:fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

const casoImagen = existsSync("public/casos/el-nino-hoy.png");

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  define: {
    __CASO_IMAGEN__: JSON.stringify(casoImagen),
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
