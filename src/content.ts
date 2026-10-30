import { config } from "./config.ts";

export type Icono =
  | "calculator"
  | "house"
  | "stethoscope"
  | "store"
  | "shield-check"
  | "lock-keyhole"
  | "clipboard-check"
  | "workflow"
  | "code-xml";

export const content = {
  marca: "exfutura",
  cta: "Escribinos",
  ctaSecundario: "Prefiero dejar mis datos",
  verJornada: "Ver la jornada",
  saltar: "Saltar al contenido",
  inicio: "Exfutura, inicio",
  menuAbrir: "Abrir menú",
  menuCerrar: "Cerrar menú",
  menuPrincipal: "Principal",
  nav: [
    { id: "problema", href: "#problema", label: "Problema" },
    { id: "servicios", href: "#servicios", label: "Servicios" },
    { id: "jornada", href: "#jornada", label: "Jornada" },
    { id: "como-funciona", href: "#como-funciona", label: "Cómo funciona" },
    { id: "casos", href: "#casos", label: "Casos" },
    { id: "sobre-mi", href: "#sobre-mi", label: "Sobre mí" },
    { id: "preguntas", href: "#preguntas", label: "Preguntas" },
    { id: "contacto", href: "#contacto", label: "Contacto" },
  ],
  hero: {
    etiqueta: "// ia segura · ciberseguridad · software",
    titulo: "Que tu equipo use IA sin regalar los datos de tus clientes.",
    bajada:
      "Una jornada práctica en tu oficina para que tu equipo aproveche la inteligencia artificial sin exponer información de clientes, pacientes ni del negocio. Para pymes de Berisso y La Plata.",
    compromiso: "Coordinamos una llamada de 15 minutos, sin compromiso.",
  },
  problema: {
    etiqueta: "// el problema",
    titulo: "Hoy tu equipo ya usa IA. La pregunta es con qué datos.",
    bajada:
      "Pegar un texto en un chat de IA parece inofensivo. Depende de qué texto sea.",
    cierre:
      "Nadie lo hace de mala fe. Pasa porque nadie explicó qué se puede cargar y qué no.",
    rubros: [
      {
        titulo: "Estudio contable",
        icono: "calculator" as const,
        texto:
          "Un balance, un recibo de sueldo o una declaración jurada con CUIT y montos, pegados en un chat para «resumirlos más rápido».",
      },
      {
        titulo: "Inmobiliaria",
        icono: "house" as const,
        texto:
          "DNI, recibos de sueldo y garantías de inquilinos, cargados para armar un contrato o una tasación.",
      },
      {
        titulo: "Clínica o consultorio",
        icono: "stethoscope" as const,
        texto:
          "Historias clínicas o estudios de pacientes, copiados para redactar un informe. Son datos de salud, los más sensibles que hay.",
      },
      {
        titulo: "Comercio",
        icono: "store" as const,
        texto:
          "Listas de clientes, precios de proveedores y datos de tarjetas en mails que parecen del banco o de un proveedor.",
      },
    ],
  },
  servicios: {
    etiqueta: "// servicios",
    titulo: "Qué hacemos",
    items: [
      {
        titulo: "IA segura para tu empresa",
        icono: "shield-check" as const,
        texto:
          "Te ayudamos a usar herramientas de IA sin exponer datos de clientes ni información sensible. Definimos qué se puede cargar, en qué herramienta y quién la usa.",
      },
      {
        titulo: "Ciberseguridad para pymes",
        icono: "lock-keyhole" as const,
        texto:
          "Capacitamos a tu equipo para reconocer estafas, phishing y fraudes, y ordenamos contraseñas, accesos y copias de seguridad. Sin jerga y sin vender miedo.",
      },
      {
        titulo: "Diagnóstico de seguridad",
        icono: "clipboard-check" as const,
        texto:
          "Revisamos cómo trabaja tu equipo, tus equipos y tus cuentas, y te entregamos una lista clara de qué arreglar primero.",
      },
      {
        titulo: "Automatización de tareas",
        icono: "workflow" as const,
        texto:
          "Sacamos de encima las tareas repetitivas: mails, planillas, carga de datos y respuestas frecuentes, con herramientas que tu equipo pueda usar solo.",
      },
      {
        titulo: "Software a medida",
        icono: "code-xml" as const,
        texto:
          "Sistemas pensados para quien no es técnico: fáciles de cargar, de entender y de usar.",
      },
    ],
  },
  jornada: {
    etiqueta: "// producto",
    titulo: "Jornada IA segura",
    bajada:
      "Una mañana de trabajo con tu equipo para usar IA con criterio y aprender a detectar engaños.",
    datos: [
      "4 horas, en tu oficina",
      "Hasta 15 personas",
      "Simulacro de phishing a las dos semanas, con autorización escrita del dueño",
      "Informe final anónimo",
      "ARS 700.000 · precio final, con factura C",
    ],
    llevanTitulo: "Qué se llevan",
    llevan: [
      "Reglas claras de qué datos se pueden cargar en una IA, en cuál y quién la usa.",
      "Práctica con las herramientas que ya usan, sobre casos de su propio rubro.",
      "Cómo reconocer un mail, un WhatsApp o una llamada falsos.",
      "Un informe para el dueño con lo que hay que reforzar.",
    ],
  },
  pasos: {
    etiqueta: "// cómo funciona",
    titulo: "Tres pasos",
    items: [
      {
        titulo: "Llamada de 15 minutos.",
        texto:
          "Nos contás cómo trabaja tu equipo y qué herramientas usan. Elegimos la fecha.",
      },
      {
        titulo: "Jornada en tu oficina.",
        texto: "Cuatro horas prácticas, con ejemplos de tu rubro.",
      },
      {
        titulo: "Simulacro y cierre.",
        texto:
          "A las dos semanas enviamos un phishing de prueba, con tu autorización por escrito. Te entregamos un informe anónimo con los resultados y lo que conviene reforzar.",
      },
    ],
  },
  casos: {
    etiqueta: "// casos",
    titulo: "Lo que ya construimos",
    items: [
      {
        id: "el-nino-hoy",
        nombre: "El Niño Hoy",
        descripcion:
          "Mapa de la lluvia en Argentina, armado con datos públicos oficiales y con las fuentes a la vista.",
        enlace: "Ver el mapa",
        url: config.elNinoHoyUrl,
        archivo: "el-nino-hoy.png",
        alt: "Captura de El Niño Hoy, mapa de la lluvia en Argentina",
        ventana: "Se abre en una pestaña nueva",
      },
    ],
  },
  sobreMi: {
    etiqueta: "// sobre mí",
    titulo: "Sebastián Feltes",
    texto:
      "Soy desarrollador de software e instructor. Doy clases en el Centro de Formación Laboral N.º 404 y armo sistemas para comercios de la región. Fundé Exfutura para que las pymes de Berisso y La Plata usen tecnología nueva sin poner en riesgo lo que ya construyeron.",
    altFoto: "Sebastián Feltes",
    monograma: "SF",
  },
  preguntas: {
    etiqueta: "// preguntas",
    titulo: "Preguntas frecuentes",
    items: [
      {
        pregunta: "¿Mi equipo tiene que saber de tecnología?",
        respuesta:
          "No. La jornada está pensada para gente que usa la computadora y el celular para trabajar, nada más. Arrancamos desde lo que ya hacen todos los días.",
      },
      {
        pregunta: "¿Hay factura?",
        respuesta: "Sí, factura C. El precio es final.",
      },
      {
        pregunta: "¿El simulacro de phishing expone a algún empleado?",
        respuesta:
          "No. El informe es anónimo: muestra cuántas personas cayeron y en qué tipo de engaño, nunca quiénes. El simulacro se hace solo con la autorización escrita del dueño.",
      },
      {
        pregunta: "¿Y si somos menos de 15?",
        respuesta:
          "El precio es el mismo: la jornada se prepara igual para 5 que para 15. Si son más de 15, lo armamos en dos grupos.",
      },
    ],
  },
  contacto: {
    titulo: "¿Coordinamos 15 minutos?",
    bajada:
      "Te contamos cómo sería la jornada para tu equipo y respondemos tus dudas.",
    enviar: "Enviar",
    ok: "Gracias. Te escribimos pronto.",
    error: "No se pudo abrir tu correo. Escribinos a",
    aviso: "Usamos tus datos solo para responderte.",
    copiar: "Copiar email",
    copiado: "Email copiado.",
    copiaError: "No se pudo copiar el email. Seleccionalo y copialo a mano.",
    campos: [
      { id: "nombre", etiqueta: "Nombre", tipo: "text", autoComplete: "name" },
      { id: "empresa", etiqueta: "Empresa", tipo: "text", autoComplete: "organization" },
      { id: "rubro", etiqueta: "Rubro", tipo: "text", autoComplete: "off" },
      { id: "email", etiqueta: "Email", tipo: "email", autoComplete: "email" },
      {
        id: "personas",
        etiqueta: "¿Cuántas personas son?",
        tipo: "text",
        autoComplete: "off",
      },
    ],
    validacion: {
      nombre: "Completá tu nombre.",
      empresa: "Completá la empresa.",
      rubro: "Completá el rubro.",
      email: "Completá tu email.",
      emailInvalido: "Ingresá un email válido.",
      personas: "Indicá cuántas personas son.",
    },
  },
  pie: {
    lugar: "Berisso y La Plata, Buenos Aires",
    derechos: "© 2026 Exfutura.",
  },
} as const;
