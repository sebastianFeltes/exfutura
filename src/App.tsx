import { content } from "./content.ts";
import { ComoFunciona } from "./components/ComoFunciona.tsx";
import { Contacto } from "./components/Contacto.tsx";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { Jornada } from "./components/Jornada.tsx";
import { Problema } from "./components/Problema.tsx";
import { Quien } from "./components/Quien.tsx";
import { Seguir } from "./components/Seguir.tsx";

function BarraMovil() {
  return (
    <div className="barra-movil">
      <a className="btn btn-primario btn-bloque" href="#contacto">
        {content.cta}
      </a>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="saltar" href="#inicio">
        {content.saltar}
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Problema />
        <Jornada />
        <ComoFunciona />
        <Seguir />
        <Quien />
        <Contacto />
      </main>
      <BarraMovil />
    </>
  );
}
