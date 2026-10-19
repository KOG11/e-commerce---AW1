const PAGINAS = [
  { titulo: "Inicio",                 url: "index.html",                      slug: "inicio" },
  { titulo: "Tv, Audio y Video",      url: "pages/tv-audio-video.html",       slug: "tv-audio-video",       icono: "assets/img/ic-tv-audio-video.svg" },
  { titulo: "Celulares y Tecnología", url: "pages/celulares-tecnologia.html", slug: "celulares-tecnologia", icono: "assets/img/ic-celulares-tecnologia.svg" },
  { titulo: "Climatización",          url: "pages/climatizacion.html",        slug: "climatizacion",        icono: "assets/img/ic-climatizacion.svg" },
  { titulo: "Electrodomésticos",      url: "pages/electrodomesticos.html",    slug: "electrodomesticos",    icono: "assets/img/ic-electrodomesticos.svg" }
];

const PAGINAS_CUENTA = [
  { titulo: "Crear cuenta",   url: "pages/registro.html", slug: "registro" },
  { titulo: "Iniciar sesión", url: "pages/login.html",    slug: "login" }
];

const PRODUCTOS = [
  {
    id: 1,
    titulo: 'Smart TV 50" 4K Ultra HD',
    marca: "Samsung",
    descripcion: "Pantalla 4K con HDR y sistema operativo Tizen para ver todas tus aplicaciones.",
    precio: 749999,
    imagen: "assets/img/producto-tv.webp",
    categoria: "tv-audio-video",
    envioGratis: true,
    destacado: true
  },
  {
    id: 2,
    titulo: "Barra de Sonido 2.1 con Subwoofer",
    marca: "LG",
    descripcion: "300W de potencia con subwoofer inalámbrico y conexión Bluetooth.",
    precio: 289999,
    imagen: "assets/img/producto-barra-sonido.webp",
    categoria: "tv-audio-video",
    envioGratis: false,
    destacado: false
  },
  {
    id: 3,
    titulo: "Galaxy A55 5G 128GB",
    marca: "Samsung",
    descripcion: "Pantalla Super AMOLED de 6.6 pulgadas, cámara de 50MP y batería de 5000mAh.",
    precio: 699999,
    imagen: "assets/img/producto-celular.webp",
    categoria: "celulares-tecnologia",
    envioGratis: true,
    destacado: true
  },
  {
    id: 4,
    titulo: "Notebook 15.6 Core i5 16GB",
    marca: "Lenovo",
    descripcion: "Procesador Intel Core i5 de 12va generación con 512GB de disco sólido.",
    precio: 1249999,
    imagen: "assets/img/producto-notebook.webp",
    categoria: "celulares-tecnologia",
    envioGratis: true,
    destacado: false
  },
  {
    id: 5,
    titulo: "Aire Split Inverter 3500W Frío/Calor",
    marca: "BGH",
    descripcion: "Tecnología inverter de bajo consumo, ideal para ambientes de hasta 30 m².",
    precio: 899999,
    imagen: "assets/img/producto-aire.webp",
    categoria: "climatizacion",
    envioGratis: true,
    destacado: true
  },
  {
    id: 6,
    titulo: "Ventilador de Pie 20 Pulgadas",
    marca: "Liliana",
    descripcion: "Tres velocidades, altura regulable y función oscilante.",
    precio: 89999,
    imagen: "assets/img/producto-ventilador.webp",
    categoria: "climatizacion",
    envioGratis: false,
    destacado: false
  },
  {
    id: 7,
    titulo: "Heladera No Frost 430L Inox",
    marca: "Whirlpool",
    descripcion: "Freezer superior, dispenser de agua y cajón para frutas y verduras.",
    precio: 1099999,
    imagen: "assets/img/producto-heladera.webp",
    categoria: "electrodomesticos",
    envioGratis: true,
    destacado: true
  },
  {
    id: 8,
    titulo: "Lavarropas Automático 8kg 1200rpm",
    marca: "Drean",
    descripcion: "Carga frontal con 15 programas de lavado y motor de bajo consumo.",
    precio: 679999,
    imagen: "assets/img/producto-lavarropas.webp",
    categoria: "electrodomesticos",
    envioGratis: false,
    destacado: false
  }
];
