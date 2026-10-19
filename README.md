# Casa ISA - Artículos para el Hogar

**Autor:** Omar Gianoli

## Descripción

Proyecto de e-commerce desarrollado como trabajo práctico. Casa ISA es una tienda
online de artículos para el hogar: televisores y audio, celulares y
tecnología, climatización y electrodomésticos.

## Estructura de carpetas

```
/
├── index.html                  Página de inicio
├── README.md
├── pages/                      Páginas internas
│   ├── login.html
│   ├── registro.html
│   ├── tv-audio-video.html
│   ├── celulares-tecnologia.html
│   ├── climatizacion.html
│   └── electrodomesticos.html
└── assets/
    ├── css/
    │   └── estilos.css         Hoja de estilos única del sitio
    ├── js/
    │   ├── datos.js            Arrays de páginas y de productos
    │   ├── sesion.js           Login, logout y rutas relativas
    │   ├── componentes.js      Encabezado, navbar y pie reutilizables
    │   ├── cards.js            Componente de card con control de cantidad
    │   └── app.js              Punto de entrada de cada página
    └── img/                    Logo e íconos en SVG, fotos de producto en WebP
```

La navegación usa rutas relativas: desde `index.html` se entra con
`pages/archivo.html` y desde las páginas internas se vuelve con `../index.html`.

