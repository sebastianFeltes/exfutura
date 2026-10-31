import { render, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App.tsx";
import { config } from "./config.ts";
import { jornadaAsunto, mailtoJornada } from "./lib/mailto.ts";
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

  it("no muestra un precio", () => {
    const texto = render(<App />).container.textContent ?? "";
    expect(texto).not.toContain("ARS");
    expect(texto).not.toContain("$");
    expect(texto).not.toContain("700.000");
    expect(texto.toLowerCase()).not.toContain("factura");
  });

  it("no usa escribinos ni verbos en plural", () => {
    const texto = (render(<App />).container.textContent ?? "").toLowerCase();
    for (const palabra of ["escribinos", "enseñamos", "revisamos", "te mostramos", "automatizamos"]) {
      expect(texto).not.toContain(palabra);
    }
  });

  it("no enlaza a WhatsApp ni a LinkedIn", () => {
    const { container } = render(<App />);
    const hrefs = [...container.querySelectorAll("a")]
      .map((enlace) => enlace.getAttribute("href") ?? "")
      .join(" ")
      .toLowerCase();
    expect(hrefs).not.toContain("wa.me");
    expect(hrefs).not.toContain("whatsapp");
    expect(hrefs).not.toContain("linkedin");
  });

  it("arma el mailto de la jornada hacia el email configurado", () => {
    const href = mailtoJornada("Nombre: Ada");
    expect(href.startsWith(`mailto:${config.email}?`)).toBe(true);
    expect(href).toContain(`subject=${encodeURIComponent(jornadaAsunto)}`);
    expect(jornadaAsunto).toBe("Jornada de seguridad e IA");
  });

  it("muestra el problema, la jornada, los pasos y la continuidad", () => {
    render(<App />);
    const problema = document.getElementById("problema");
    const jornada = document.getElementById("jornada");
    const pasos = document.getElementById("como-funciona");
    const seguir = document.getElementById("seguir");
    if (!problema || !jornada || !pasos || !seguir) throw new Error("Faltan secciones.");
    expect(within(problema).getAllByRole("listitem")).toHaveLength(3);
    expect(within(jornada).getAllByRole("listitem")).toHaveLength(5);
    expect(within(pasos).getAllByRole("listitem")).toHaveLength(3);
    expect(within(seguir).getAllByRole("listitem")).toHaveLength(3);
  });

  it("no aplica animaciones cuando se prefiere menos movimiento", () => {
    mockMatchMedia(true);
    const { container } = render(<App />);
    expect(container.querySelector(".reveal")).toBeNull();
    expect(container.querySelector(".logo-fondo-anim")).toBeNull();
    expect(container.querySelector(".logo-fondo")).not.toBeNull();
    expect(container.querySelector("[data-animated='true']")).toBeNull();
  });
});
