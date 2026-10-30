import { content } from "./content.ts";
import { Casos } from "./components/Casos.tsx";
import { ComoFunciona } from "./components/ComoFunciona.tsx";
import { Contacto } from "./components/Contacto.tsx";
import { Escribinos } from "./components/Escribinos.tsx";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { Jornada } from "./components/Jornada.tsx";
import { Preguntas } from "./components/Preguntas.tsx";
import { Problema } from "./components/Problema.tsx";
import { Servicios } from "./components/Servicios.tsx";
import { SobreMi } from "./components/SobreMi.tsx";
import { mailtoLlamada } from "./lib/mailto.ts";

function BarraMovil() {
  const href = mailtoLlamada();
  if (!href) return null;
  return (
    <div className="barra-movil">
      <Escribinos bloque />
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="saltar" href="#contenido">
        {content.saltar}
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Problema />
        <Servicios />
        <Jornada />
        <ComoFunciona />
        <Casos />
        <SobreMi />
        <Preguntas />
        <Contacto />
      </main>
      <Footer />
      <BarraMovil />
    </>
  );
}
