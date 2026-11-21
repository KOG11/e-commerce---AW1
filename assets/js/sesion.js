const CLAVE_SESION = "casaisa_usuario";

function obtenerBase() {
  return window.location.pathname.includes("/pages/") ? "../" : "";
}

function rutaHacia(url) {
  const dentroDePages = window.location.pathname.includes("/pages/");

  if (dentroDePages && url.startsWith("pages/")) {
    return url.slice("pages/".length);
  }

  return obtenerBase() + url;
}

function obtenerUsuario() {
  try {
    const guardado = sessionStorage.getItem(CLAVE_SESION);
    return guardado ? JSON.parse(guardado) : null;
  } catch (error) {
    return null;
  }
}

function haySesion() {
  return obtenerUsuario() !== null;
}

function iniciarSesion(datosUsuario) {
  try {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(datosUsuario));
  } catch (error) {
    console.warn("No se pudo guardar la sesión en este navegador.");
  }
  window.location.href = rutaHacia("index.html");
}

function cerrarSesion() {
  try {
    sessionStorage.removeItem(CLAVE_SESION);
  } catch (error) {
    console.warn("No se pudo borrar la sesión en este navegador.");
  }
  window.location.href = rutaHacia("pages/login.html");
}
