/* ==========================================================
   Casa ISA - Manejo de la sesion del usuario
   Etapa 4: los datos del usuario pasan a sessionStorage.
   A diferencia de localStorage, sessionStorage se borra solo
   al cerrar la pestaña, que es el comportamiento esperado de
   una sesion.
   ========================================================== */

const CLAVE_SESION = "casaisa_usuario";

/* ----------------------------------------------------------
   Prefijo de rutas.
   Las direcciones se escriben una sola vez desde la raiz.
   Si la pagina actual esta dentro de /pages/ hay que subir un
   nivel con "../" para que las rutas relativas funcionen.
   ---------------------------------------------------------- */
function obtenerBase() {
  return window.location.pathname.includes("/pages/") ? "../" : "";
}

/* Arma la ruta final de una direccion escrita desde la raiz.
   Si la pagina abierta ya esta dentro de pages/ y el destino
   tambien, alcanza con el nombre del archivo: no hace falta
   subir un nivel para volver a bajar. */
function rutaHacia(url) {
  const dentroDePages = window.location.pathname.includes("/pages/");

  if (dentroDePages && url.startsWith("pages/")) {
    return url.slice("pages/".length);
  }

  return obtenerBase() + url;
}

/* ----------------------------------------------------------
   Consultas de sesion
   ---------------------------------------------------------- */

/* Devuelve el usuario logueado, o null si no hay nadie.
   Va dentro de try/catch porque algunos navegadores bloquean
   el almacenamiento cuando el sitio se abre sin servidor. */
function obtenerUsuario() {
  try {
    const guardado = sessionStorage.getItem(CLAVE_SESION);
    return guardado ? JSON.parse(guardado) : null;
  } catch (error) {
    return null;
  }
}

/* true cuando hay una sesion abierta */
function haySesion() {
  return obtenerUsuario() !== null;
}

/* ----------------------------------------------------------
   Acciones de sesion
   ---------------------------------------------------------- */

/* Guarda el usuario y lo manda a la pagina principal */
function iniciarSesion(datosUsuario) {
  try {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(datosUsuario));
  } catch (error) {
    console.warn("No se pudo guardar la sesión en este navegador.");
  }
  window.location.href = rutaHacia("index.html");
}

/* Borra la sesion y lo devuelve al login.
   El carrito vive en localStorage y no se toca: si el usuario
   vuelve a entrar, sus productos siguen ahi. */
function cerrarSesion() {
  try {
    sessionStorage.removeItem(CLAVE_SESION);
  } catch (error) {
    console.warn("No se pudo borrar la sesión en este navegador.");
  }
  window.location.href = rutaHacia("pages/login.html");
}
