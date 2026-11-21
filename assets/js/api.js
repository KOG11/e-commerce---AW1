const RUTA_DATOS = "assets/data/productos.json";

let catalogo = null;

async function obtenerCatalogo() {
  if (catalogo !== null) {
    return catalogo;
  }

  const respuesta = await fetch(rutaHacia(RUTA_DATOS));

  if (!respuesta.ok) {
    throw new Error("No se pudo leer el catálogo (" + respuesta.status + ")");
  }

  catalogo = await respuesta.json();
  return catalogo;
}

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

async function obtenerProductosPorCategoria(slug) {
  const productos = await obtenerProductos();
  return productos.filter(p => p.categoria === slug);
}

async function obtenerProductoPorId(id) {
  const productos = await obtenerProductos();
  return productos.find(p => p.id === Number(id));
}

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
