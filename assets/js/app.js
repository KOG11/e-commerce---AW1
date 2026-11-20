/* ==========================================================
   Casa ISA - Punto de entrada
   Etapa 4: se ejecuta en todas las paginas, monta los
   componentes, pide los datos al JSON y conecta lo que esa
   pagina necesite.
   ========================================================== */

document.addEventListener("DOMContentLoaded", async function () {

  /* 1. Encabezado y pie, en todas las paginas */
  montarComponentes();

  /* 2. Saludo del home cuando hay una sesion abierta */
  mostrarBienvenida();

  /* 3. Productos, si la pagina tiene donde mostrarlos */
  await cargarProductosDeLaPagina();

  /* 4. Ficha de producto, si estamos en esa pagina */
  await mostrarFichaProducto();

  /* 5. Carrito, si estamos en esa pagina */
  mostrarCarrito();

  /* 6. Formularios de login y registro */
  conectarFormularios();
});

/* ----------------------------------------------------------
   Saludo personalizado en el home.
   Los datos salen de sessionStorage.
   ---------------------------------------------------------- */
function mostrarBienvenida() {
  const hueco = document.getElementById("bienvenida");

  if (!hueco) {
    return;
  }

  const usuario = obtenerUsuario();

  if (usuario) {
    hueco.innerHTML = `
      <p class="bienvenida">Hola de nuevo, ${usuario.nombre}. Mirá lo que tenemos para vos.</p>`;
  }
}

/* ----------------------------------------------------------
   Carga de productos.
   El home tiene una grilla por categoria; cada pagina de
   categoria tiene una sola. Las dos se resuelven igual:
   buscando los contenedores que declaran data-categoria.
   ---------------------------------------------------------- */
async function cargarProductosDeLaPagina() {
  const contenedores = document.querySelectorAll("[data-categoria]");

  if (contenedores.length === 0) {
    return;
  }

  try {
    const productos = await obtenerProductos();

    contenedores.forEach(contenedor => {
      const slug = contenedor.dataset.categoria;

      const lista = (slug === "destacados")
        ? productos.filter(p => p.destacado)
        : productos.filter(p => p.categoria === slug);

      mostrarProductos(contenedor, lista);
    });

  } catch (error) {
    console.error("Error al cargar el catálogo:", error);

    contenedores.forEach(contenedor => {
      contenedor.innerHTML = mensajeDeError();
    });
  }
}

/* ----------------------------------------------------------
   Login y registro.
   JavaScript intercepta el envio y resuelve la redireccion.
   ---------------------------------------------------------- */
function conectarFormularios() {

  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const email = document.getElementById("email").value;

      iniciarSesion({
        nombre: email.split("@")[0],
        email: email
      });
    });
  }

  const formRegistro = document.getElementById("form-registro");

  if (formRegistro) {
    formRegistro.addEventListener("submit", function (evento) {
      evento.preventDefault();

      iniciarSesion({
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value
      });
    });
  }
}
