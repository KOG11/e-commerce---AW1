/* ==========================================================
   Casa ISA - Estructuras de datos del sitio
   Las paginas del sitio se declaran una sola vez aca y de
   este array salen el navbar, las tarjetas de categoria del
   home y los links del pie.
   ========================================================== */

/* ----------------------------------------------------------
   Paginas del sitio.
   Array de objetos con el titulo que se muestra y la
   direccion del archivo. Las rutas se escriben siempre desde
   la raiz del proyecto: cada pagina les agrega el prefijo que
   le corresponde segun en que carpeta esta.
   ---------------------------------------------------------- */

const PAGINAS = [
  { titulo: "Inicio",                 url: "index.html",                      slug: "inicio" },
  { titulo: "Tv, Audio y Video",      url: "pages/tv-audio-video.html",       slug: "tv-audio-video",       icono: "assets/img/ic-tv-audio-video.svg" },
  { titulo: "Celulares y Tecnología", url: "pages/celulares-tecnologia.html", slug: "celulares-tecnologia", icono: "assets/img/ic-celulares-tecnologia.svg" },
  { titulo: "Climatización",          url: "pages/climatizacion.html",        slug: "climatizacion",        icono: "assets/img/ic-climatizacion.svg" },
  { titulo: "Electrodomésticos",      url: "pages/electrodomesticos.html",    slug: "electrodomesticos",    icono: "assets/img/ic-electrodomesticos.svg" }
];

/* Paginas de acceso a la cuenta, separadas del navbar */
const PAGINAS_CUENTA = [
  { titulo: "Crear cuenta",   url: "pages/registro.html", slug: "registro" },
  { titulo: "Iniciar sesión", url: "pages/login.html",    slug: "login" }
];

/* ----------------------------------------------------------
   Beneficios de la tienda.
   Se muestran en una franja debajo de la portada.
   ---------------------------------------------------------- */

const BENEFICIOS = [
  { icono: "assets/img/ic-envio.svg",    titulo: "Envío a todo el país",  detalle: "Gratis desde $ 500.000" },
  { icono: "assets/img/ic-cuotas.svg",   titulo: "Hasta 12 cuotas",       detalle: "Sin interés con tu tarjeta" },
  { icono: "assets/img/ic-garantia.svg", titulo: "Garantía oficial",      detalle: "12 meses en todo el catálogo" },
  { icono: "assets/img/ic-local.svg",    titulo: "Retiro en el local",    detalle: "Paso de los Andes 1745" }
];

/* ----------------------------------------------------------
   Los productos ya no estan aca.
   Desde la etapa 4 viven en assets/data/productos.json y se
   piden con fetch desde api.js.
   ---------------------------------------------------------- */
