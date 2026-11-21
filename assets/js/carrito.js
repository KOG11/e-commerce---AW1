const CLAVE_CARRITO = "casaisa_carrito";

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

function eliminarDelCarrito(id) {
  const items = leerCarrito().filter(item => item.id !== id);
  guardarCarrito(items);
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function totalUnidades() {
  return leerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
}

function totalAPagar() {
  return leerCarrito().reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

function actualizarContadorCarrito() {
  const etiqueta = document.getElementById("contador-carrito");

  if (etiqueta) {
    etiqueta.textContent = totalUnidades();
  }
}
