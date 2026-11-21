function mostrarCarrito() {
  const contenedor = document.getElementById("detalle-carrito");

  if (!contenedor) {
    return;
  }

  const items = leerCarrito();

  if (items.length === 0) {
    contenedor.innerHTML = `
      <div class="carrito-vacio">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste productos.</p>
        <a class="boton boton-principal" href="${rutaHacia("index.html")}">Ver productos</a>
      </div>`;
    return;
  }

  const base = obtenerBase();

  const filas = items.map(item => `
      <article class="fila-carrito">
        <img class="miniatura" src="${base}${item.imagen}" alt="${item.titulo}">

        <div class="datos-fila">
          <p class="marca">${item.marca}</p>
          <h3>${item.titulo}</h3>
          <p class="precio-unitario">${formatearPrecio(item.precio)} por unidad</p>
        </div>

        <div class="control-cantidad control-chico">
          <button type="button" class="boton-cantidad" data-accion="restar" data-id="${item.id}" aria-label="Quitar una unidad de ${item.titulo}">-</button>
          <span class="cantidad">${item.cantidad}</span>
          <button type="button" class="boton-cantidad" data-accion="sumar" data-id="${item.id}" aria-label="Agregar una unidad de ${item.titulo}">+</button>
        </div>

        <p class="subtotal">${formatearPrecio(item.precio * item.cantidad)}</p>

        <button type="button" class="boton-eliminar" data-id="${item.id}" aria-label="Eliminar ${item.titulo} del carrito">
          Eliminar
        </button>
      </article>`).join("\n");

  const total = totalAPagar();
  const cuota = Math.round(total / 12);

  contenedor.innerHTML = `
    <div class="lista-carrito">
      ${filas}
    </div>

    <aside class="resumen-carrito">
      <h2>Resumen de la compra</h2>
      <p class="linea-resumen">
        <span>Productos (${totalUnidades()})</span>
        <span>${formatearPrecio(total)}</span>
      </p>
      <p class="linea-resumen">
        <span>Envío</span>
        <span>A convenir</span>
      </p>
      <p class="linea-total">
        <span>Total</span>
        <span>${formatearPrecio(total)}</span>
      </p>
      <p class="cuotas">12 cuotas sin interés de ${formatearPrecio(cuota)}</p>

      <button type="button" class="boton boton-principal boton-ancho" id="finalizar-compra">
        Finalizar compra
      </button>
      <button type="button" class="boton boton-texto boton-ancho" id="vaciar-carrito">
        Vaciar carrito
      </button>
    </aside>`;

  conectarAccionesDelCarrito(contenedor);
}

function conectarAccionesDelCarrito(contenedor) {
  contenedor.querySelectorAll(".boton-cantidad").forEach(boton => {
    boton.addEventListener("click", function () {
      const id = Number(this.dataset.id);
      const item = leerCarrito().find(i => i.id === id);

      if (!item) {
        return;
      }

      const nueva = this.dataset.accion === "sumar"
        ? item.cantidad + 1
        : item.cantidad - 1;

      cambiarCantidadEnCarrito(id, nueva);
      mostrarCarrito();
    });
  });

  contenedor.querySelectorAll(".boton-eliminar").forEach(boton => {
    boton.addEventListener("click", function () {
      eliminarDelCarrito(Number(this.dataset.id));
      mostrarCarrito();
    });
  });

  const botonVaciar = document.getElementById("vaciar-carrito");
  if (botonVaciar) {
    botonVaciar.addEventListener("click", function () {
      vaciarCarrito();
      mostrarCarrito();
    });
  }

  const botonFinalizar = document.getElementById("finalizar-compra");
  if (botonFinalizar) {
    botonFinalizar.addEventListener("click", finalizarCompra);
  }
}

function finalizarCompra() {
  const usuario = obtenerUsuario();
  const total = formatearPrecio(totalAPagar());
  const unidades = totalUnidades();

  const saludo = usuario ? usuario.nombre : "Gracias por tu compra";

  vaciarCarrito();

  document.getElementById("detalle-carrito").innerHTML = `
    <div class="compra-confirmada">
      <h2>¡Listo, ${saludo}!</h2>
      <p>Registramos tu pedido de ${unidades} ${unidades === 1 ? "producto" : "productos"} por ${total}.</p>
      <p>Te vamos a contactar para coordinar el pago y la entrega.</p>
      <a class="boton boton-principal" href="${rutaHacia("index.html")}">Seguir comprando</a>
    </div>`;
}
