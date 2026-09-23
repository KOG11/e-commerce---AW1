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
    └── img/                    Logo, íconos y foto de producto
```

La navegación usa rutas relativas: desde `index.html` se entra con
`pages/archivo.html` y desde las páginas internas se vuelve con `../index.html`.

