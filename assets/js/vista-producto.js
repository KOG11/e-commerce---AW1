/* ==========================================================
   Casa ISA - Ficha de producto
   Cada producto tiene su propia direccion:
   pages/producto.html?id=101
   El id viaja en la URL, se lee con URLSearchParams y con el
   se busca el producto en el catalogo.
   ========================================================== */

/* ----------------------------------------------------------
   Dibuja la ficha completa.
   ---------------------------------------------------------- */
async function mostrarFichaProducto() {
  const contenedor = document.getElementById("ficha-producto");

  if (!contenedor) {
    return;
  }

  /* El id llega en la direccion: ?id=101 */
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  if (!id) {
    contenedor.innerHTML = fichaNoEncontrada("No indicaste qué producto querés ver.");
    return;
  }

  try {
    const producto = await obtenerProductoPorId(id);

    if (!producto) {
      contenedor.innerHTML = fichaNoEncontrada("El producto que buscás no está en el catálogo.");
      return;
    }

    document.title = "Casa ISA - " + producto.titulo;

    contenedor.innerHTML = componenteFicha(producto);
    conectarFicha(producto);

    await mostrarRelacionados(producto);

  } catch (error) {
    console.error("Error al cargar el producto:", error);
    contenedor.innerHTML = mensajeDeError();
  }
}

/* ----------------------------------------------------------
   COMPONENTE: la ficha
   ---------------------------------------------------------- */
function componenteFicha(producto) {
  const base = obtenerBase();
  const cuota = Math.round(producto.precio / 12);

  /* Direccion de la categoria a la que pertenece */
  const categoria = PAGINAS.find(p => p.slug === producto.categoria);
  const urlCategoria = categoria ? rutaHacia(categoria.url) : rutaHacia("index.html");

  const envio = producto.envioGratis
    ? '<li class="dato-envio">Envío gratis a todo el país</li>'
    : '<li>Envío a convenir según la zona</li>';

  const stock = producto.stock > 0
    ? `<li>${producto.stock} ${producto.stock === 1 ? "unidad disponible" : "unidades disponibles"}</li>`
    : '<li class="dato-agotado">Sin stock por el momento</li>';

  return `
    <nav class="migas" aria-label="Ruta de navegación">
      <a href="${rutaHacia("index.html")}">Inicio</a>
      <span aria-hidden="true">/</span>
      <a href="${urlCategoria}">${producto.nombreCategoria}</a>
      <span aria-hidden="true">/</span>
      <span class="miga-actual">${producto.titulo}</span>
    </nav>

    <div class="detalle-producto">
      <div class="foto-grande">
        <img src="${base}${producto.imagen}" alt="${producto.titulo}">
      </div>

      <div class="info-producto">
        <p class="marca">${producto.marca}</p>
        <h1>${producto.titulo}</h1>

        <p class="precio-grande">${formatearPrecio(producto.precio)}</p>
        <p class="cuotas">12 cuotas sin interés de ${formatearPrecio(cuota)}</p>

        <p class="descripcion-larga">${producto.descripcion}</p>

        <ul class="datos-producto">
          ${envio}
          ${stock}
          <li>Garantía oficial de 12 meses</li>
          <li>Retiro gratis en Paso de los Andes 1745</li>
        </ul>

        <div class="compra">
          <div class="control-cantidad">
            <button type="button" class="boton-cantidad" data-accion="restar" aria-label="Quitar una unidad">-</button>
            <span class="cantidad" id="cantidad-ficha">1</span>
            <button type="button" class="boton-cantidad" data-accion="sumar" aria-label="Agregar una unidad">+</button>
          </div>

          <button type="button" class="boton boton-principal" id="agregar-ficha">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>

    ${componenteEspecificaciones(producto)}`;
}

/* ----------------------------------------------------------
   COMPONENTE: tabla de especificaciones
   Recorre el objeto especificaciones del producto. Cada clave
   es el nombre del dato y cada valor su contenido.
   Los valores con varios items vienen separados por " / " y
   se muestran como lista.
   ---------------------------------------------------------- */
function componenteEspecificaciones(producto) {
  if (!producto.especificaciones) {
    return "";
  }

  const filas = Object.entries(producto.especificaciones)
    .map(([nombre, valor]) => `
          <tr>
            <th scope="row">${nombre}</th>
            <td>${formatearValor(valor)}</td>
          </tr>`)
    .join("");

  return `
    <section class="especificaciones">
      <h2>Más información</h2>

      <p class="aclaracion">
        Las imágenes son de carácter ilustrativo. Las especificaciones están
        sujetas a modificaciones.
      </p>

      <table class="tabla-especificaciones">
        <caption class="oculto">Especificaciones técnicas de ${producto.titulo}</caption>
        <tbody>${filas}
        </tbody>
      </table>
    </section>`;
}

/* Un valor con varios items se muestra como lista */
function formatearValor(valor) {
  const partes = String(valor).split(" / ");

  if (partes.length < 2) {
    return valor;
  }

  return "<ul>" + partes.map(p => `<li>${p}</li>`).join("") + "</ul>";
}

/* Pantalla para cuando el producto no existe */
function fichaNoEncontrada(motivo) {
  return `
    <div class="aviso aviso-error">
      <h3>No encontramos ese producto</h3>
      <p>${motivo}</p>
      <p><a href="${rutaHacia("index.html")}">Volver al inicio</a></p>
    </div>`;
}

/* ----------------------------------------------------------
   Botones de la ficha
   ---------------------------------------------------------- */
function conectarFicha(producto) {
  let cantidad = 1;
  const etiqueta = document.getElementById("cantidad-ficha");

  document.querySelectorAll("#ficha-producto .boton-cantidad").forEach(boton => {
    boton.addEventListener("click", function () {
      if (this.dataset.accion === "sumar") {
        cantidad = cantidad + 1;
      } else if (cantidad > 1) {
        cantidad = cantidad - 1;
      }
      etiqueta.textContent = cantidad;
    });
  });

  const botonAgregar = document.getElementById("agregar-ficha");

  botonAgregar.addEventListener("click", function () {
    agregarAlCarrito(producto, cantidad);
    confirmarAgregado(this);
  });
}

/* ----------------------------------------------------------
   Otros productos de la misma categoria
   ---------------------------------------------------------- */
async function mostrarRelacionados(producto) {
  const contenedor = document.getElementById("relacionados");

  if (!contenedor) {
    return;
  }

  const deLaCategoria = await obtenerProductosPorCategoria(producto.categoria);
  const otros = deLaCategoria.filter(p => p.id !== producto.id);

  if (otros.length === 0) {
    return;
  }

  document.getElementById("titulo-relacionados").textContent =
    "Más en " + producto.nombreCategoria;

  mostrarProductos(contenedor, otros);
}
