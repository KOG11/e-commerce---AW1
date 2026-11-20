/* ==========================================================
   Casa ISA - Carrito de compras
   Etapa 4: los productos elegidos se guardan en localStorage,
   asi sobreviven al cambio de pagina y a cerrar el navegador.
   ========================================================== */

const CLAVE_CARRITO = "casaisa_carrito";

/* ----------------------------------------------------------
   Lectura y escritura del carrito.
   Se guarda como un array de objetos:
   [ { id, titulo, marca, precio, imagen, cantidad }, ... ]
   ---------------------------------------------------------- */

function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    return [];
  }
}

function guardarCarrito(items) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  } catch (error) {
    console.warn("No se pudo guardar el carrito en este navegador.");
  }
  actualizarContadorCarrito();
}

/* ----------------------------------------------------------
   Operaciones sobre el carrito
   ---------------------------------------------------------- */

/* Agrega un producto. Si ya estaba, le suma la cantidad. */
function agregarAlCarrito(producto, cantidad) {
  if (cantidad < 1) {
    return;
  }

  const items = leerCarrito();
  const existente = items.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad = existente.cantidad + cantidad;
  } else {
    items.push({
      id: producto.id,
      titulo: producto.titulo,
      marca: producto.marca,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
  }

  guardarCarrito(items);
}

/* Cambia la cantidad de un item ya agregado */
function cambiarCantidadEnCarrito(id, nuevaCantidad) {
  const items = leerCarrito();
  const item = items.find(i => i.id === id);

  if (!item) {
    return;
  }

  if (nuevaCantidad < 1) {
    eliminarDelCarrito(id);
    return;
  }

  item.cantidad = nuevaCantidad;
  guardarCarrito(items);
}

/* Saca un producto del carrito */
function eliminarDelCarrito(id) {
  const items = leerCarrito().filter(item => item.id !== id);
  guardarCarrito(items);
}

/* Deja el carrito vacio */
function vaciarCarrito() {
  guardarCarrito([]);
}

/* ----------------------------------------------------------
   Totales
   ---------------------------------------------------------- */

/* Cantidad de unidades sumando todos los productos */
function totalUnidades() {
  return leerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
}

/* Cuanto sale todo el carrito */
function totalAPagar() {
  return leerCarrito().reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

/* Refresca el numerito que se ve en el encabezado */
function actualizarContadorCarrito() {
  const etiqueta = document.getElementById("contador-carrito");

  if (etiqueta) {
    etiqueta.textContent = totalUnidades();
  }
}
