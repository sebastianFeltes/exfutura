export type Icono = "mail-warning" | "file-warning" | "package-x" | "key-round" | "sparkles";

export const content = {
  marca: "exfutura",
  cta: "Contacto",
  verJornada: "Ver la jornada",
  saltar: "Saltar al contenido",
  inicio: "Exfutura, inicio",
  menuAbrir: "Abrir menú",
  menuCerrar: "Cerrar menú",
  menuPrincipal: "Principal",
  nav: [
    { id: "problema", href: "#problema", label: "Problema" },
    { id: "jornada", href: "#jornada", label: "Jornada" },
    { id: "como-funciona", href: "#como-funciona", label: "Cómo funciona" },
    { id: "quien", href: "#quien", label: "Instructor" },
    { id: "contacto", href: "#contacto", label: "Contacto" },
  ],
  hero: {
    etiqueta: "// jornada de seguridad e ia para pymes",
    titulo: [
      { texto: "Una mañana para que tu equipo no caiga en ", acento: false },
      { texto: "estafas", acento: true },
      { texto: " y use ", acento: false },
      { texto: "IA", acento: true },
      { texto: " sin riesgo.", acento: false },
    ],
    bajada:
      "Voy a tu oficina, trabajo con tu equipo cuatro horas sobre casos reales de tu rubro y dos semanas después pongo a prueba lo aprendido.",
    nota: "Precio cerrado por jornada, sin abonos ni costos ocultos. Te lo paso en una llamada de 15 minutos.",
    imagen: "hero.webp",
    alt: "Oficina de una pyme durante una jornada de trabajo.",
  },
  problema: {
    etiqueta: "// el problema",
    titulo: "Así empiezan la mayoría de los problemas",
    cierre: "Nadie lo hace a propósito. Pasa porque nadie lo explicó.",
    items: [
      {
        numero: "01",
        titulo: "El mail de ARCA (ex AFIP).",
        texto: "«Tenés una deuda, descargá el detalle.» El adjunto no es un PDF.",
      },
      {
        numero: "02",
        titulo: "El proveedor que «cambió el CBU».",
        texto: "Un WhatsApp con su foto y su forma de hablar. La transferencia va a otra cuenta.",
      },
      {
        numero: "03",
        titulo: "La planilla de clientes en ChatGPT.",
        texto: "Para ordenarla más rápido. Con nombres, teléfonos y deudas adentro.",
      },
    ],
  },
  jornada: {
    etiqueta: "// producto",
    titulo: "Jornada de seguridad e IA",
    imagen: "jornada.webp",
    alt: "Capacitación presencial, con el equipo mirando una pantalla.",
    ancho: 1200,
    alto: 800,
    datos: [
      { valor: 4, unidad: "horas", detalle: "en tu oficina" },
      { valor: 15, unidad: "personas", detalle: "como máximo por jornada" },
      {
        valor: 2,
        unidad: "semanas",
        detalle: "después, simulacro con tu autorización por escrito",
      },
    ],
    llevanTitulo: "Qué se lleva tu equipo",
    llevan: [
      {
        icono: "mail-warning" as const,
        texto: "Reconocer mails, WhatsApps y llamadas falsas.",
      },
      {
        icono: "file-warning" as const,
        texto: "Detectar adjuntos y archivos disfrazados antes de abrirlos.",
      },
      {
        icono: "package-x" as const,
        texto: "Por qué el software pirata y las extensiones del navegador son una puerta abierta.",
      },
      {
        icono: "key-round" as const,
        texto: "Contraseñas que se recuerdan y la verificación en dos pasos activada.",
      },
      {
        icono: "sparkles" as const,
        texto: "Qué datos nunca se cargan en una IA, y cómo usarla bien con el resto.",
      },
    ],
    destacado:
      "Para vos, el dueño: un informe anónimo del simulacro con lo que conviene reforzar. Muestra cuántos cayeron y en qué, nunca quiénes.",
  },
  pasos: {
    etiqueta: "// cómo funciona",
    titulo: "Cómo funciona",
    items: [
      {
        numero: "01",
        titulo: "Llamada de 15 minutos.",
        texto: "Me contás cómo trabaja tu equipo y te paso el precio.",
      },
      {
        numero: "02",
        titulo: "La jornada.",
        texto: "Una mañana en tu oficina, práctica y con ejemplos de tu rubro.",
      },
      {
        numero: "03",
        titulo: "El simulacro.",
        texto: "A las dos semanas mando un engaño de prueba y te entrego el informe.",
      },
    ],
  },
  seguir: {
    etiqueta: "// si querés seguir",
    titulo: "Si querés seguir",
    items: [
      {
        titulo: "Diagnóstico.",
        texto: "Reviso equipos, accesos y copias de seguridad, y te dejo una lista de qué arreglar primero.",
      },
      {
        titulo: "Automatización.",
        texto: "Saco de encima las tareas repetidas que hoy se hacen a mano.",
      },
      {
        titulo: "IA aplicada.",
        texto: "Armo herramientas de IA para tu negocio, con tus datos protegidos.",
      },
    ],
  },
  quien: {
    etiqueta: "// quién la da",
    titulo: "Sebastián Feltes",
    texto:
      "Soy instructor en el Centro de Formación Laboral N.º 404 y desarrollador de software. Doy cada jornada en persona.",
    altFoto: "Sebastián Feltes",
    monograma: "SF",
  },
  contacto: {
    titulo: "¿Coordinamos 15 minutos?",
    bajada: "Te cuento cómo sería la jornada para tu equipo y te paso el precio.",
    enviar: "Enviar",
    ok: "Gracias. Te escribo pronto.",
    error: "No se pudo abrir tu correo. Escribí a",
    aviso: "Uso tus datos solo para responderte.",
    campos: [
      { id: "nombre", etiqueta: "Nombre", tipo: "text" as const, autoComplete: "name" },
      { id: "empresa", etiqueta: "Empresa", tipo: "text" as const, autoComplete: "organization" },
      {
        id: "personas",
        etiqueta: "Cantidad de personas",
        tipo: "text" as const,
        autoComplete: "off",
      },
    ],
    mensaje: { id: "mensaje", etiqueta: "Mensaje" },
    validacion: {
      nombre: "Completá tu nombre.",
      empresa: "Completá la empresa.",
      personas: "Indicá cuántas personas son.",
      mensaje: "Escribí un mensaje.",
    },
  },
  pie: {
    lugar: "La Plata",
    instagram: "exfutura.ar",
    desarrollo: "Consulta por desarrollo.",
    derechos: "© 2026 Exfutura.",
  },
} as const;
