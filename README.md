# Casa ISA - Artículos para el Hogar

**Autor:** Omar Gianoli
**Materia:** Aplicaciones Web I - Analista en Sistemas, Colegio Universitario IES

E-commerce de artículos para el hogar desarrollado como trabajo práctico
integrador: televisores y audio, celulares y tecnología, climatización y
electrodomésticos.

**Sitio publicado:** https://kog11.github.io/e-commerce---AW1/

> El catálogo se carga con `fetch`, y los navegadores bloquean esa lectura
> cuando la página se abre con doble clic desde una carpeta. Para verlo
> funcionando hay que usar el link de arriba, o la extensión Live Server de
> Visual Studio Code.

## Etapas del trabajo

| Etapa | Contenido |
|---|---|
| 1 | Estructura general del sitio en HTML |
| 2 | Identidad visual y estilos con CSS |
| 3 | Componentes, estructuras de datos y redirecciones con JavaScript |
| 4 | Catálogo en JSON con `fetch`, carrito de compras y almacenamiento |
| Final | Ficha de producto con dirección propia |

## Estructura de carpetas

```
/
├── index.html                      Home con productos por categoría
├── README.md
├── ENTREGA-FINAL.md                Documento de la entrega final
├── pages/
│   ├── login.html
│   ├── registro.html
│   ├── carrito.html                Carrito de compras
│   ├── producto.html               Ficha de producto (?id=101)
│   ├── tv-audio-video.html
│   ├── celulares-tecnologia.html
│   ├── climatizacion.html
│   └── electrodomesticos.html
└── assets/
    ├── css/
    │   └── estilos.css             Hoja de estilos única del sitio
    ├── data/
    │   └── productos.json          Catálogo: categorías y productos
    ├── js/
    │   ├── datos.js                Array de páginas del sitio
    │   ├── sesion.js               Login, logout y rutas relativas
    │   ├── carrito.js              Carrito en localStorage
    │   ├── api.js                  Lectura del JSON con fetch
    │   ├── componentes.js          Encabezado, navbar y pie reutilizables
    │   ├── cards.js                Componente de card de producto
    │   ├── vista-carrito.js        Pantalla del carrito
    │   ├── vista-producto.js       Ficha de producto
    │   └── app.js                  Punto de entrada de cada página
    └── img/                        Logo e íconos en SVG, fotos en WebP
```

La navegación usa rutas relativas: desde `index.html` se entra con
`pages/archivo.html` y desde las páginas internas se vuelve con `../index.html`.
La función `obtenerBase()` detecta en qué carpeta está la página abierta y
antepone `../` cuando corresponde, así las direcciones se escriben una sola vez.

## Cómo funciona

### Fuente de datos

El catálogo vive en `assets/data/productos.json`, con esta forma:

```json
{
  "tienda": "Casa ISA",
  "categorias": [
    {
      "slug": "tv-audio-video",
      "titulo": "Tv, Audio y Video",
      "productos": [
        { "id": 101, "titulo": "...", "marca": "...", "descripcion": "...",
          "precio": 749999, "imagen": "...", "stock": 8,
          "envioGratis": true, "destacado": true }
      ]
    }
  ]
}
```

`api.js` lo pide con `fetch` y guarda el resultado en memoria, así una misma
página no lo descarga dos veces. Agregar un producto es agregar un objeto al
JSON: no hay que tocar HTML ni JavaScript.

### Componentes

`componentes.js` arma el encabezado completo (barra de avisos, cabecera con el
logo y navbar), la franja de beneficios, las tarjetas de categoría y el pie de
página. Cada archivo HTML
declara solo dos huecos, `<div id="encabezado">` y `<div id="pie">`, que se
llenan al cargar la página. El navbar se escribe una vez y se usa en las ocho
páginas.

La página actual se marca con la clase `activo`, y los accesos de cuenta cambian
según el estado de la sesión: sin sesión muestra "Crear cuenta" e "Iniciar
sesión"; con sesión abierta saluda al usuario y muestra "Cerrar sesión".

### Sesión y carrito

Son dos almacenamientos distintos, cada uno con su motivo:

| Dato | Dónde | Por qué |
|---|---|---|
| Usuario logueado | `sessionStorage` | Una sesión termina al cerrar la pestaña |
| Carrito | `localStorage` | Los productos elegidos sobreviven al cierre del navegador |

Todas las lecturas y escrituras van dentro de `try/catch`, porque algunos
navegadores bloquean el almacenamiento según cómo se abra el sitio.

### Card de producto

`componenteCard(producto)` recibe un objeto del catálogo y devuelve la tarjeta
con imagen, marca, título, descripción, precio, cuotas, el control para sumar o
restar unidades y el botón para agregar al carrito. El mismo componente se usa
en el home y en las cuatro páginas de categoría.

### Ficha de producto

Cada producto tiene su propia dirección: `pages/producto.html?id=101`. El id
viaja en la URL, se lee con `URLSearchParams` y con él se busca el producto en
el catálogo.

La ficha muestra la imagen en grande, la descripción completa, el precio, las
cuotas, el stock disponible, la garantía y las opciones de envío, más el control
de cantidad y el botón de compra. Abajo aparecen los otros productos de la misma
categoría.

Como cada ficha tiene su link propio, se puede compartir o guardar en favoritos.
Si el id no existe o falta, la página muestra un aviso en vez de romperse.

### Carrito de compras

`pages/carrito.html` lista lo agregado con su subtotal por producto, permite
cambiar cantidades, eliminar un producto, vaciar todo y cerrar la compra. El
total y el contador del encabezado se recalculan después de cada cambio.

## Tecnologías

- HTML5 semántico
- CSS3: variables en `:root`, Flexbox, Grid y media queries
- JavaScript: `fetch` con `async/await`, componentes, arrays de objetos,
  eventos, `sessionStorage` y `localStorage`
- SVG para el logo y los íconos, WebP para las fotos de producto

Sin librerías ni frameworks: todo el código es propio y el sitio no carga nada
desde servidores externos.

## Identidad visual

La paleta se construyó a partir del logo, diseñado para este proyecto en SVG.
Está definida con variables CSS:

| Variable | Color | Uso |
|---|---|---|
| `--azul-tinta` | `#0B2E5C` | Barra de avisos, títulos, pie de página |
| `--azul` | `#1D5FB5` | Navbar, botones, links |
| `--azul-claro` | `#E9F1FB` | Fondos de sección |
| `--azul-humo` | `#F7FAFE` | Fondo de imagen de producto |
| `--gris-borde` | `#D9E2EC` | Bordes de tarjetas e inputs |
| `--gris-texto` | `#44515F` | Texto de párrafos |

La franja de beneficios bajo la portada (envío, cuotas, garantía y retiro en el
local) sale del array `BENEFICIOS` de `datos.js`, con íconos propios en SVG.

Tipografías: Trebuchet MS para títulos, la misma del logo, y Segoe UI para el
texto. No se cargan fuentes externas, así el sitio se ve igual sin conexión.

Las fotos de producto se procesaron todas igual: recorte del fondo sobrante,
encuadre cuadrado de 500x500 sobre blanco y compresión a WebP. Ninguna supera
los 18 KB.

## Formularios

Login y registro declaran `method` y `action`. Se usa `method="post"` porque
envían datos sensibles que no deben viajar en la URL. El `action` apunta a la
página de inicio como destino de respaldo: JavaScript intercepta el envío con
`preventDefault()` y resuelve la redirección, ya que no hay procesamiento del
lado del servidor.

## Cómo verlo

Entrar al [sitio publicado](https://kog11.github.io/e-commerce---AW1/), o
clonar el repositorio y abrirlo con Live Server.
