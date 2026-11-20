/* ==========================================================
   Casa ISA - Componentes reutilizables
   Etapa 3: el encabezado y el pie se arman una sola vez y se
   insertan en todas las paginas. Si manana cambia una
   categoria, se toca solo datos.js.
   ========================================================== */

/* ----------------------------------------------------------
   Devuelve el nombre del archivo que se esta viendo,
   por ejemplo "climatizacion.html". Sirve para marcar en el
   navbar la pagina actual.
   ---------------------------------------------------------- */
function paginaActual() {
  const partes = window.location.pathname.split("/");
  const archivo = partes[partes.length - 1];
  return archivo === "" ? "index.html" : archivo;
}

/* Compara la direccion de una pagina con la que se ve ahora */
function esPaginaActual(url) {
  return url.split("/").pop() === paginaActual();
}

/* ----------------------------------------------------------
   COMPONENTE: accesos de cuenta
   Cambia segun haya o no una sesion abierta.
   ---------------------------------------------------------- */
function componenteAccesos() {
  const usuario = obtenerUsuario();

  if (usuario) {
    return `
      <span class="saludo">Hola, ${usuario.nombre}</span>
      <a href="#" id="cerrar-sesion">Cerrar sesión</a>`;
  }

  return PAGINAS_CUENTA
    .map(p => `<a href="${rutaHacia(p.url)}">${p.titulo}</a>`)
    .join("\n        ");
}

/* ----------------------------------------------------------
   COMPONENTE: encabezado completo
   Barra de avisos + cabecera con el logo + navbar.
   El navbar se genera recorriendo el array PAGINAS.
   ---------------------------------------------------------- */
function componenteEncabezado() {
  const base = obtenerBase();

  const enlaces = PAGINAS
    .map(p => {
      const activo = esPaginaActual(p.url) ? ' class="activo"' : "";
      return `<a href="${rutaHacia(p.url)}"${activo}>${p.titulo}</a>`;
    })
    .join("\n        ");

  return `
  <div class="barra-avisos">
    <div class="contenedor">
      <span>Envíos a todo el país - Todas las tarjetas</span>
      <span>Villa María, Córdoba</span>
    </div>
  </div>

  <header class="cabecera">
    <div class="contenedor">
      <a class="logo" href="${rutaHacia("index.html")}">
        <img src="${base}assets/img/logo.svg" alt="Casa ISA - Artículos para el Hogar">
      </a>
      <nav class="accesos">
        ${componenteAccesos()}
        <a class="enlace-carrito" href="${rutaHacia("pages/carrito.html")}">
          Carrito <span class="globo" id="contador-carrito">0</span>
        </a>
      </nav>
    </div>
  </header>

  <nav class="navbar">
    <div class="contenedor">
        ${enlaces}
    </div>
  </nav>`;
}

/* ----------------------------------------------------------
   COMPONENTE: pie de pagina
   Las categorias tambien salen del array PAGINAS.
   ---------------------------------------------------------- */
function componentePie() {
  const base = obtenerBase();

  const categorias = PAGINAS
    .filter(p => p.slug !== "inicio")
    .map(p => `<li><a href="${rutaHacia(p.url)}">${p.titulo}</a></li>`)
    .join("\n            ");

  const cuenta = PAGINAS_CUENTA
    .map(p => `<li><a href="${rutaHacia(p.url)}">${p.titulo}</a></li>`)
    .join("\n            ");

  return `
  <footer class="pie">
    <div class="contenedor">
      <div class="columnas">
        <div>
          <img src="${base}assets/img/logo-icono-blanco.svg" alt="Casa ISA">
          <p>Artículos para el hogar en Villa María desde 2026.</p>
        </div>
        <div>
          <h3>Categorías</h3>
          <ul>
            ${categorias}
          </ul>
        </div>
        <div>
          <h3>Atención al cliente</h3>
          <ul>
            <li>Teléfono: (3537) 607341</li>
            <li>Email: omargianoli11@gmail.com</li>
            <li>Lunes a viernes de 9 a 18</li>
            <li>Sábados de 9 a 13</li>
          </ul>
        </div>
        <div>
          <h3>Nuestro local</h3>
          <ul>
            <li>Paso de los Andes 1745</li>
            <li>Villa María, Córdoba</li>
            ${cuenta}
            <li><a href="${rutaHacia("pages/carrito.html")}">Mi carrito</a></li>
          </ul>
        </div>
      </div>
      <p class="legal">Casa ISA - Trabajo Práctico de Aplicaciones Web I</p>
    </div>
  </footer>`;
}

/* ----------------------------------------------------------
   COMPONENTE: accesos a las categorias del home
   Tambien se arma recorriendo el array PAGINAS.
   ---------------------------------------------------------- */
function componenteCategorias() {
  const base = obtenerBase();

  return PAGINAS
    .filter(p => p.slug !== "inicio")
    .map(p => `
        <a class="tarjeta-categoria" href="${rutaHacia(p.url)}">
          <span class="marco-icono"><img src="${base}${p.icono}" alt=""></span>
          <span>${p.titulo}</span>
        </a>`)
    .join("");
}

/* ----------------------------------------------------------
   COMPONENTE: franja de beneficios
   Sale del array BENEFICIOS de datos.js.
   ---------------------------------------------------------- */
function componenteBeneficios() {
  const base = obtenerBase();

  return BENEFICIOS
    .map(b => `
        <div class="beneficio">
          <img src="${base}${b.icono}" alt="" aria-hidden="true">
          <div>
            <p class="titulo-beneficio">${b.titulo}</p>
            <p class="detalle-beneficio">${b.detalle}</p>
          </div>
        </div>`)
    .join("");
}

/* ----------------------------------------------------------
   Inserta los componentes en los huecos del HTML y conecta
   el boton de cerrar sesion.
   ---------------------------------------------------------- */
function montarComponentes() {
  const huecoEncabezado = document.getElementById("encabezado");
  const huecoPie = document.getElementById("pie");

  if (huecoEncabezado) {
    huecoEncabezado.innerHTML = componenteEncabezado();

    const botonSalir = document.getElementById("cerrar-sesion");
    if (botonSalir) {
      botonSalir.addEventListener("click", function (evento) {
        evento.preventDefault();
        cerrarSesion();
      });
    }

    /* El contador del carrito se llena apenas aparece */
    actualizarContadorCarrito();
  }

  if (huecoPie) {
    huecoPie.innerHTML = componentePie();
  }

  const huecoCategorias = document.getElementById("categorias");
  if (huecoCategorias) {
    huecoCategorias.innerHTML = componenteCategorias();
  }

  const huecoBeneficios = document.getElementById("beneficios");
  if (huecoBeneficios) {
    huecoBeneficios.innerHTML = componenteBeneficios();
  }
}
