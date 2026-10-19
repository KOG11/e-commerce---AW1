document.addEventListener("DOMContentLoaded", function () {

  montarComponentes();

  const contenedorProductos = document.getElementById("productos");

  if (contenedorProductos) {
    const categoria = contenedorProductos.dataset.categoria;

    const lista = (categoria === "destacados")
      ? PRODUCTOS.filter(p => p.destacado)
      : PRODUCTOS.filter(p => p.categoria === categoria);

    mostrarProductos(contenedorProductos, lista);
    actualizarTotalCarrito();
  }

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

});
