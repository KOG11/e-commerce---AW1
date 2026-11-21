const cantidadesElegidas = {};

function formatearPrecio(numero) {
  return "$ " + numero.toLocaleString("es-AR");
}

function componenteCard(producto) {
  const base = obtenerBase();
  const cuota = Math.round(producto.precio / 12);

  const distintivo = producto.envioGratis
    ? '<span class="distintivo">Envío gratis</span>'
    : "";

  const ficha = rutaHacia("pages/producto.html") + "?id=" + producto.id;

  return `
    <article class="card-producto">
      <a class="imagen" href="${ficha}">
        ${distintivo}
        <img src="${base}${producto.imagen}" alt="${producto.titulo}" loading="lazy">
      </a>
      <div class="datos">
        <p class="marca">${producto.marca}</p>
        <h3 class="nombre"><a href="${ficha}">${producto.titulo}</a></h3>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">${formatearPrecio(producto.precio)}</p>
        <p class="cuotas">12 cuotas sin interés de ${formatearPrecio(cuota)}</p>

        <div class="control-cantidad">
          <button type="button" class="boton-cantidad" data-accion="restar" data-id="${producto.id}" aria-label="Quitar una unidad de ${producto.titulo}">-</button>
          <span class="cantidad" id="cantidad-${producto.id}">1</span>
          <button type="button" class="boton-cantidad" data-accion="sumar" data-id="${producto.id}" aria-label="Agregar una unidad de ${producto.titulo}">+</button>
        </div>

        <button type="button" class="boton boton-principal boton-ancho boton-agregar" data-id="${producto.id}">
          Agregar al carrito
        </button>
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
    if (cantidadesElegidas[p.id] === undefined) {
      cantidadesElegidas[p.id] = 1;
    }
    pintarCantidad(p.id);
  });

  conectarBotones(contenedor, listaProductos);
}

function conectarBotones(contenedor, listaProductos) {
  contenedor.querySelectorAll(".boton-cantidad").forEach(boton => {
    boton.addEventListener("click", function () {
      const id = Number(this.dataset.id);

      if (this.dataset.accion === "sumar") {
        cantidadesElegidas[id] = cantidadesElegidas[id] + 1;
      } else if (cantidadesElegidas[id] > 1) {
        cantidadesElegidas[id] = cantidadesElegidas[id] - 1;
      }

      pintarCantidad(id);
    });
  });

  contenedor.querySelectorAll(".boton-agregar").forEach(boton => {
    boton.addEventListener("click", function () {
      const id = Number(this.dataset.id);
      const producto = listaProductos.find(p => p.id === id);

      agregarAlCarrito(producto, cantidadesElegidas[id]);
      confirmarAgregado(this);
    });
  });
}

function pintarCantidad(id) {
  const etiqueta = document.getElementById("cantidad-" + id);

  if (etiqueta) {
    etiqueta.textContent = cantidadesElegidas[id];
  }
}

function confirmarAgregado(boton) {
  boton.textContent = "Agregado al carrito";
  boton.classList.add("boton-agregado");
  boton.disabled = true;

  setTimeout(function () {
    boton.textContent = "Agregar al carrito";
    boton.classList.remove("boton-agregado");
    boton.disabled = false;
  }, 1400);
}
