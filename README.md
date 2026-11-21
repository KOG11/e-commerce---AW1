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

