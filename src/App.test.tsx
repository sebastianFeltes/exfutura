import { render, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App.tsx";
import { config } from "./config.ts";
import { content } from "./content.ts";
import { llamadaAsunto, llamadaCuerpo, mailtoLlamada } from "./lib/mailto.ts";
import { mockMatchMedia } from "./test/match-media.ts";

beforeEach(() => {
  mockMatchMedia(false);
});

describe("Exfutura", () => {
  it("no muestra corchetes en el texto renderizado", () => {
    const { container } = render(<App />);
    const texto = container.textContent ?? "";
    expect(texto.includes("[")).toBe(false);
    expect(texto.includes("]")).toBe(false);
  });

  it("no enlaza a WhatsApp ni a LinkedIn", () => {
    const { container } = render(<App />);
    const html = container.innerHTML.toLowerCase();
    expect(html).not.toContain("wa.me");
    expect(html).not.toContain("linkedin");
  });

  it("arma el mailto de la llamada con asunto y cuerpo codificados", () => {
    render(<App />);
    const esperado = `mailto:${config.email}?subject=${encodeURIComponent(llamadaAsunto)}&body=${encodeURIComponent(llamadaCuerpo)}`;
    expect(mailtoLlamada()).toBe(esperado);
    const llamados = [...document.querySelectorAll("a")].filter(
      (enlace) => enlace.textContent?.trim() === content.cta,
    );
    expect(llamados.length).toBeGreaterThan(0);
    for (const enlace of llamados) {
      expect(enlace.getAttribute("href")).toBe(esperado);
    }
  });

  it("no aplica animaciones cuando se prefiere menos movimiento", () => {
    mockMatchMedia(true);
    const { container } = render(<App />);
    expect(container.querySelector(".logo-abertura")).toBeNull();
    expect(container.querySelector(".reveal")).toBeNull();
    expect(container.querySelector("[data-animated='true']")).toBeNull();
  });

  it("muestra cinco servicios y un caso", () => {
    render(<App />);
    const servicios = document.getElementById("servicios");
    const casos = document.getElementById("casos");
    if (!servicios || !casos) throw new Error("Faltan secciones.");
    expect(within(servicios).getAllByRole("listitem")).toHaveLength(5);
    expect(within(casos).getAllByRole("listitem")).toHaveLength(1);
  });
});
