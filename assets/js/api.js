/* ==========================================================
   Casa ISA - Acceso a la fuente de datos
   Etapa 4: los productos ya no estan escritos en el codigo.
   Se piden con fetch al archivo productos.json y se guardan
   en memoria para no volver a pedirlos en la misma pagina.
   ========================================================== */

/* Direccion del archivo de datos, desde la raiz del proyecto */
const RUTA_DATOS = "assets/data/productos.json";

/* Catalogo ya descargado. Arranca vacio. */
let catalogo = null;

/* ----------------------------------------------------------
   Pide el JSON y devuelve el catalogo completo.
   Es asincrona: la respuesta no llega al instante, por eso
   quien la llama tiene que usar await.
   ---------------------------------------------------------- */
async function obtenerCatalogo() {
  /* Si ya se descargo antes, se reutiliza */
  if (catalogo !== null) {
    return catalogo;
  }

  const respuesta = await fetch(rutaHacia(RUTA_DATOS));

  /* fetch no falla solo con un 404: hay que revisarlo a mano */
  if (!respuesta.ok) {
    throw new Error("No se pudo leer el catálogo (" + respuesta.status + ")");
  }

  catalogo = await respuesta.json();
  return catalogo;
}

/* ----------------------------------------------------------
   Devuelve todos los productos en una sola lista, agregandole
   a cada uno el slug y el titulo de su categoria.
   ---------------------------------------------------------- */
async function obtenerProductos() {
  const datos = await obtenerCatalogo();

  return datos.categorias.flatMap(categoria =>
    categoria.productos.map(producto => ({
      ...producto,
      categoria: categoria.slug,
      nombreCategoria: categoria.titulo
    }))
  );
}

/* Productos de una sola categoria */
async function obtenerProductosPorCategoria(slug) {
  const productos = await obtenerProductos();
  return productos.filter(p => p.categoria === slug);
}

/* Busca un producto por su id */
async function obtenerProductoPorId(id) {
  const productos = await obtenerProductos();
  return productos.find(p => p.id === Number(id));
}

/* ----------------------------------------------------------
   Mensaje de error para mostrar en pantalla.
   El caso mas comun es abrir el sitio con doble clic: el
   navegador bloquea fetch sobre archivos locales por
   seguridad, y hace falta un servidor web.
   ---------------------------------------------------------- */
function mensajeDeError() {
  const esArchivoLocal = window.location.protocol === "file:";

  if (esArchivoLocal) {
    return `
      <div class="aviso aviso-error">
        <h3>No se pueden cargar los productos</h3>
        <p>El navegador bloquea la lectura del catálogo cuando la página se
        abre directamente desde una carpeta.</p>
        <p>Para verlo funcionando, abrí el sitio publicado o usá la extensión
        Live Server de Visual Studio Code.</p>
      </div>`;
  }

  return `
    <div class="aviso aviso-error">
      <h3>No se pueden cargar los productos</h3>
      <p>Hubo un problema al leer el catálogo. Probá recargar la página.</p>
    </div>`;
}
