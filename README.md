# Despensa Austral — Semana 1

> **Sitio publicado:** https://dcarvajal99.github.io/supermercado-diego-carvajal-pfy2202/
> **Repositorio:** https://github.com/dcarvajal99/supermercado-diego-carvajal-pfy2202

Actividad formativa «Utilizando tecnologías avanzadas de React en sitios web» de la asignatura
**Desarrollo Frontend II (PFY2202)**, Duoc UC. Exp 1 — Semana 1.

Sitio de **gestión de inventario** para Despensa Austral, un supermercado ficticio del sur de Chile,
construido con **React 19**, **React Router 7** y **Vite**. El home es el inventario de la sucursal:
resumen del stock, filtros, ajuste rápido de unidades y un detalle por producto donde se registran
entradas y salidas. Un **menú inferior** fijo lleva a las otras dos páginas: **Quiénes somos** y
**Nuestras tiendas**. Todo ocurre en una sola página HTML: React Router cambia la vista según la URL,
sin recargar el navegador.

---

## Rutas del sitio

| Ruta | Página | Qué muestra |
|---|---|---|
| `/` | Inventario (home) | Resumen del stock, filtros y tabla de los 18 productos con ajuste rápido de unidades |
| `/producto/:id` | Detalle del producto | Ruta dinámica: datos del producto, estado del stock y formulario de entradas y salidas |
| `/quienes-somos` | Quiénes somos | Historia, cifras, misión, visión y valores del supermercado |
| `/nuestras-tiendas` | Nuestras tiendas | Las 5 sucursales con dirección, horario y servicios, filtrables por región |
| cualquier otra | Página no encontrada | Aviso con la dirección pedida y enlaces para volver |

Los filtros también viajan en la URL, así que se pueden compartir y sobreviven a una recarga:
`/?categoria=lacteos`, `/?estado=bajo`, `/?q=arroz`, `/nuestras-tiendas?region=nuble`.

## Qué pide la actividad y cómo se resolvió

| Pide la actividad | Cómo se resolvió |
|---|---|
| Sitio de gestión de inventario para un supermercado con HTML, JavaScript, CSS y React | Inventario de 18 productos en 7 categorías: stock, mínimo, precio, ubicación y estado (Disponible, Stock bajo, Sin stock). Los ajustes se guardan en `localStorage` |
| Una página principal que sirva como home | `Inicio` en la ruta índice (`/`): cuatro cifras de resumen que también filtran, buscador, categoría, estado y tabla del inventario |
| Un menú inferior para navegar a otras dos páginas | `MenuInferior`: barra fija al pie de la pantalla con tres `NavLink` (Inventario, Quiénes somos, Nuestras tiendas) que marcan la página activa |
| Dos páginas adicionales de la lista | **Quiénes somos** y **Nuestras tiendas** |
| Implementar y configurar React Router | `react-router-dom` 7 con `BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink`, `useParams`, `useSearchParams`, `useLocation`, `useNavigate`, `useMatch` y `useOutletContext` |
| Repositorio `supermercado-nombre-apellido-siglaCurso` | `supermercado-diego-carvajal-pfy2202`, publicado en GitHub Pages |

## Cómo se usa React Router

- **`BrowserRouter`** (en `main.jsx`) envuelve la aplicación con `basename` igual a la base de Vite,
  porque GitHub Pages sirve el sitio dentro de `/supermercado-diego-carvajal-pfy2202/`.
- **`Routes` y `Route`** (en `App.jsx`) declaran las rutas. Todas cuelgan de una **ruta de diseño**
  (`<Route element={<Plantilla />}>`) que dibuja la cabecera, el pie y el menú inferior, y deja un
  **`<Outlet />`** donde va la página de la ruta actual. La ruta `*` va al final y atrapa las
  direcciones que no existen.
- **Ruta dinámica** `producto/:id`: `DetalleProducto` lee el `:id` con **`useParams`** y busca el
  producto. Si no existe, la página lo dice en vez de quedar en blanco. Los enlaces «Anterior» y
  «Siguiente» recorren los productos por la misma ruta.
- **`NavLink`** en el menú inferior agrega la clase `activo` y `aria-current="page"` a la página
  abierta; **`useMatch`** mantiene marcado «Inventario» mientras se ve el detalle de un producto.
- **`useSearchParams`** guarda los filtros del inventario y de las tiendas en la URL. Escribir en el
  buscador reemplaza la entrada del historial (`replace`); elegir una categoría la agrega, así el botón
  Atrás vuelve al filtro anterior.
- **`Link` con `state`**: al abrir un producto, el enlace lleva los filtros activos y «Inventario»
  (en la ruta de navegación del detalle) regresa a la misma vista filtrada.
- **`useOutletContext`**: el inventario vive en la `Plantilla`, que no se desmonta al cambiar de
  página, y llega a cada página por el `context` del `Outlet`. Así, el stock que se ajusta en un
  detalle ya está actualizado al volver al home.
- **`useNavigate`**: «Volver a la página anterior» en la página no encontrada (solo si hay una página
  anterior dentro del sitio, según `useLocation().key`).
- **Al cambiar de página** la `Plantilla` vuelve arriba y lleva el foco al contenido, y cada página
  cambia el título de la pestaña (`useTituloPagina`): el teclado y el lector de pantalla parten
  desde la página nueva.
- **GitHub Pages y las rutas**: Pages no conoce las rutas de React Router, así que al recargar
  `/quienes-somos` respondería 404. `vite.config.js` copia `index.html` como `404.html` al construir:
  esa respuesta carga la misma aplicación y `BrowserRouter` muestra la página correcta.

## Estructura del proyecto

```
supermercado-diego-carvajal-pfy2202/
├── index.html                    Página que monta React (Bootstrap 5.3.8 e Inter por CDN)
├── vite.config.js                Base de GitHub Pages y copia de index.html como 404.html
├── public/favicon.svg
├── src/
│   ├── main.jsx                  BrowserRouter con basename
│   ├── App.jsx                   Declaración de rutas
│   ├── estilos.css               Paleta y ajustes sobre Bootstrap
│   ├── paginas/                  Una por ruta
│   │   ├── Inicio.jsx            Home: inventario
│   │   ├── DetalleProducto.jsx   Ruta dinámica /producto/:id
│   │   ├── QuienesSomos.jsx
│   │   ├── NuestrasTiendas.jsx
│   │   └── NoEncontrada.jsx      Ruta *
│   ├── componentes/              Piezas de las páginas
│   │   ├── Plantilla.jsx         Cabecera + Outlet + pie + menú inferior
│   │   ├── Cabecera.jsx  MenuInferior.jsx
│   │   ├── ResumenInventario.jsx  FiltrosInventario.jsx  TablaInventario.jsx
│   │   ├── EstadoStock.jsx  FormularioMovimiento.jsx  BotonRestablecer.jsx
│   │   └── TarjetaTienda.jsx
│   ├── hooks/                    useInventario, useEstadoGuardado, useTituloPagina
│   ├── datos/                    productos.js (categorías y productos), tiendas.js
│   └── utilidades/               formato.js (pesos, números, texto) e inventario.js (estado, resumen, filtros)
└── capturas/semana-1/            Evidencias de la entrega
```

## Cómo ejecutarlo

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173/supermercado-diego-carvajal-pfy2202/
```

Otros comandos:

```bash
npm run build      # deja la versión publicable en dist/ (con 404.html)
npm run preview    # sirve dist/ en http://localhost:4173/supermercado-diego-carvajal-pfy2202/
npm run lint       # revisa el código con oxlint
npm run deploy     # construye y publica dist/ en la rama gh-pages
```

## Verificación

- W3C Nu HTML Checker: 0 errores y 0 advertencias en el DOM que genera React en 7 estados del sitio
  (inventario, inventario filtrado sin resultados, detalle, producto inexistente, quiénes somos,
  tiendas filtradas por región y página no encontrada).
- W3C CSS Validator: hoja válida, 0 errores y 0 advertencias.
- `oxlint`: sin avisos.
- Recorrido en Chrome a 1280 px y a 375 px: navegación con el menú inferior, filtros en la URL,
  Atrás y Adelante del navegador, apertura de un producto y regreso con los filtros, entrada y salida
  con validación, cambio de producto con el formulario limpio, recarga directa de una ruta interna y
  dirección inexistente.

## Diseño

Una sola tipografía (Inter), cinco neutros y un acento verde (`#166534`); el rojo `#b02a37` se
reserva para las alertas de stock. Sin degradados ni sombras: la estructura se marca con espacio en
blanco y líneas de 1 px. En el teléfono la tabla del inventario se convierte en bloques con la
etiqueta de cada dato.

## Historial del proyecto

| Semana | Entrega | Qué se agregó |
|---|---|---|
| 1 | Utilizando tecnologías avanzadas de React en sitios web | Sitio con React Router: inventario, detalle por ruta dinámica, Quiénes somos, Nuestras tiendas, página no encontrada y menú inferior |

## Autor

Diego Carvajal — Desarrollo Frontend II (PFY2202), Duoc UC.
