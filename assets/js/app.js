document.addEventListener("DOMContentLoaded", async function () {
  montarComponentes();

  mostrarBienvenida();

  await cargarProductosDeLaPagina();

  await mostrarFichaProducto();

  mostrarCarrito();

  conectarFormularios();
});

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
