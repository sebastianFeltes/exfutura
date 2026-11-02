import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { Resvg } from "@resvg/resvg-js";

function woffATtf(buffer) {
  const vista = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  if (vista.getUint32(0) !== 0x774f4646) throw new Error("La fuente no es WOFF.");
  const flavor = vista.getUint32(4);
  const tablasTotal = vista.getUint16(12);
  const tablas = [];
  let cursor = 44;
  for (let indice = 0; indice < tablasTotal; indice += 1) {
    const etiqueta = buffer.subarray(cursor, cursor + 4).toString("ascii");
    const inicio = vista.getUint32(cursor + 4);
    const comprimido = vista.getUint32(cursor + 8);
    const original = vista.getUint32(cursor + 12);
    const checksum = vista.getUint32(cursor + 16);
    const crudo = buffer.subarray(inicio, inicio + comprimido);
    const datos = comprimido === original ? Buffer.from(crudo) : inflateSync(crudo);
    tablas.push({ etiqueta, datos, checksum });
    cursor += 20;
  }
  tablas.sort((a, b) => Buffer.from(a.etiqueta).compare(Buffer.from(b.etiqueta)));
  const potencia = 2 ** Math.floor(Math.log2(tablasTotal));
  const searchRange = potencia * 16;
  const entrySelector = Math.floor(Math.log2(tablasTotal));
  const rangeShift = tablasTotal * 16 - searchRange;
  let desplazamiento = 12 + tablasTotal * 16;
  const registros = tablas.map((tabla) => {
    const registro = { ...tabla, offset: desplazamiento };
    desplazamiento += tabla.datos.length + ((4 - (tabla.datos.length % 4)) % 4);
    return registro;
  });
  const salida = Buffer.alloc(desplazamiento);
  const salidaVista = new DataView(salida.buffer);
  salidaVista.setUint32(0, flavor);
  salidaVista.setUint16(4, tablasTotal);
  salidaVista.setUint16(6, searchRange);
  salidaVista.setUint16(8, entrySelector);
  salidaVista.setUint16(10, rangeShift);
  registros.forEach((tabla, indice) => {
    const en = 12 + indice * 16;
    salida.write(tabla.etiqueta, en, "ascii");
    salidaVista.setUint32(en + 4, tabla.checksum);
    salidaVista.setUint32(en + 8, tabla.offset);
    salidaVista.setUint32(en + 12, tabla.datos.length);
    tabla.datos.copy(salida, tabla.offset);
  });
  return salida;
}

const marca = readFileSync("public/logo/exfutura-icono.svg", "utf8");
const wordmark = readFileSync("public/logo/exfutura-claro.svg", "utf8");

function interior(svg) {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

function png(svg, ancho, destino) {
  const imagen = new Resvg(svg, { fitTo: { mode: "width", value: ancho } });
  writeFileSync(destino, imagen.render().asPng());
}

png(marca, 32, "public/favicon-32.png");
png(marca, 180, "public/apple-touch-icon.png");
png(marca, 512, "public/icon-512.png");

const woff = readFileSync("node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff");
const fuente = "scripts/.manrope.ttf";
writeFileSync(fuente, woffATtf(woff));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0F1B2D"/>
  <g fill="#14B8A6" opacity="0.08">
    ${Array.from({ length: 35 }, (_, fila) =>
      Array.from({ length: 67 }, (_, columna) => `<circle cx="${columna * 18 + 1}" cy="${fila * 18 + 1}" r="1"/>`).join(""),
    ).join("")}
  </g>
  <svg x="72" y="128" width="112" height="112" viewBox="0 0 1728 1728">
    ${interior(marca)}
  </svg>
  <svg x="204" y="156" width="300" height="56" viewBox="0 450 8820 1630">
    ${interior(wordmark)}
  </svg>
  <text x="80" y="320" fill="#F7F7F5" font-family="Manrope" font-size="52" font-weight="800">
    <tspan x="80" dy="0">Una mañana para que tu equipo</tspan>
    <tspan x="80" dy="68">no caiga en estafas y use IA</tspan>
    <tspan x="80" dy="68">sin riesgo.</tspan>
  </text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    fontFiles: [fuente],
    loadSystemFonts: false,
    defaultFontFamily: "Manrope",
  },
});

writeFileSync("public/og.png", resvg.render().asPng());
unlinkSync(fuente);
