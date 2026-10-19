const cantidades = {};

function formatearPrecio(numero) {
  return "$ " + numero.toLocaleString("es-AR");
}

function componenteCard(producto) {
  const base = obtenerBase();
  const cuota = Math.round(producto.precio / 12);

  const distintivo = producto.envioGratis
    ? '<span class="distintivo">Envío gratis</span>'
    : "";

  return `
    <article class="card-producto">
      <div class="imagen">
        ${distintivo}
        <img src="${base}${producto.imagen}" alt="${producto.titulo}">
      </div>
      <div class="datos">
        <p class="marca">${producto.marca}</p>
        <h3 class="nombre">${producto.titulo}</h3>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">${formatearPrecio(producto.precio)}</p>
        <p class="cuotas">12 cuotas sin interés de ${formatearPrecio(cuota)}</p>

        <div class="control-cantidad">
          <button type="button" class="boton-cantidad" data-accion="restar" data-id="${producto.id}" aria-label="Quitar una unidad">-</button>
          <span class="cantidad" id="cantidad-${producto.id}">0</span>
          <button type="button" class="boton-cantidad" data-accion="sumar" data-id="${producto.id}" aria-label="Agregar una unidad">+</button>
        </div>
      </div>
    </article>`;
}

function mostrarProductos(contenedor, listaProductos) {
  if (listaProductos.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-productos">
        <p>Todavía no cargamos los productos de esta categoría.</p>
        <p><a href="${rutaHacia("index.html")}">Volver al inicio</a></p>
      </div>`;
    return;
  }

  contenedor.innerHTML = listaProductos.map(componenteCard).join("\n");

  listaProductos.forEach(p => {
    if (cantidades[p.id] === undefined) {
      cantidades[p.id] = 0;
    }
    actualizarCantidad(p.id);
  });

  conectarBotonesCantidad(contenedor);
}

function cambiarCantidad(id, accion) {
  if (accion === "sumar") {
    cantidades[id] = cantidades[id] + 1;
  } else if (cantidades[id] > 0) {
    cantidades[id] = cantidades[id] - 1;
  }

  actualizarCantidad(id);
  actualizarTotalCarrito();
}

function actualizarCantidad(id) {
  const etiqueta = document.getElementById("cantidad-" + id);
  if (etiqueta) {
    etiqueta.textContent = cantidades[id];
  }
}

function actualizarTotalCarrito() {
  const total = Object.values(cantidades).reduce((suma, n) => suma + n, 0);
  const etiqueta = document.getElementById("total-carrito");
  if (etiqueta) {
    etiqueta.textContent = total;
  }
}

function conectarBotonesCantidad(contenedor) {
  const botones = contenedor.querySelectorAll(".boton-cantidad");

  botones.forEach(boton => {
    boton.addEventListener("click", function () {
      const id = Number(this.dataset.id);
      cambiarCantidad(id, this.dataset.accion);
    });
  });
}
