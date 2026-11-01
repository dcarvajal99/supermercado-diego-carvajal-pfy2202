# Despensa Austral — Semana 2

> **Sitio publicado:** https://dcarvajal99.github.io/supermercado-diego-carvajal-pfy2202/
> **Repositorio:** https://github.com/dcarvajal99/supermercado-diego-carvajal-pfy2202

Actividad formativa «Implementando gestión de estado en componentes frontend con React» de la
asignatura **Desarrollo Frontend II (PFY2202)**, Duoc UC. Exp 1 — Semana 2.

Sitio de **gestión de inventario** para Despensa Austral, un supermercado ficticio del sur de Chile,
construido con **React 19**, **React Router 7**, **Tailwind CSS 4** y **Vite**. Esta semana el sitio
suma un **estado global** con la lista de artículos, un **menú nuevo** en la cabecera y dos páginas:
**Lista de artículos**, con una tabla de todo el inventario, e **Ingresar artículo**, con un formulario
para agregar artículos nuevos. Todo el estilo pasó de Bootstrap a **Tailwind CSS**.

---

## Rutas del sitio

| Ruta | Página | Menú | Qué muestra |
|---|---|---|---|
| `/` | Inicio | Inferior | Panel: cifras del inventario y artículos por reponer |
| `/articulos` | Lista de artículos | Artículos | Tabla de todos los artículos, con filtros y ajuste rápido de stock |
| `/ingresar-articulo` | Ingresar artículo | Artículos | Formulario para agregar un artículo al inventario |
| `/articulo/:id` | Detalle del artículo | — | Ruta dinámica: datos del artículo y formulario de entradas y salidas |
| `/quienes-somos` | Quiénes somos | Inferior | Historia, cifras, misión, visión y valores del supermercado |
| `/nuestras-tiendas` | Nuestras tiendas | Inferior | Las 5 sucursales con dirección, horario y servicios, filtrables por región |
| cualquier otra | Página no encontrada | — | Aviso con la dirección pedida y enlaces para volver |

Los filtros viajan en la URL, así que se pueden compartir y sobreviven a una recarga:
`/articulos?tipo=lacteos`, `/articulos?estado=bajo`, `/articulos?q=arroz`,
`/nuestras-tiendas?region=nuble`.

## Qué pide la actividad y cómo se resolvió

| Pide la actividad | Cómo se resolvió |
|---|---|
| Continuar el sitio de gestión de inventario | Mismo repositorio y sitio de la Semana 1; el home pasó a ser un panel y la tabla completa se movió a su propia página |
| Un menú nuevo que navegue a otras dos páginas | `MenuArticulos`, en la cabecera: «Lista de artículos» e «Ingresar artículo». El menú inferior sigue con Inicio, Quiénes somos y Nuestras tiendas |
| Una página para ingresar artículos nuevos | `IngresarArticulo` en `/ingresar-articulo` |
| Un estado global con la lista de artículos disponibles | Context API + `useReducer`: `InventarioProvider` envuelve la aplicación en `main.jsx` y cualquier componente lee el estado con `useInventario()` |
| El estado incluye nombre, marca y tipo de producto | Cada artículo guarda `nombre`, `marca` y `tipo`, además de SKU, formato, precio, stock, stock mínimo y ubicación |
| Un formulario para agregar artículos | `FormularioArticulo`: validación por campo, foco en el primer error y detección de duplicados. Genera el SKU y el identificador de la URL |
| Una página que liste todos los artículos en una tabla | `ListaArticulos` en `/articulos`: tabla con artículo, marca, tipo de producto, precio, stock, mínimo y estado |
| Un framework de CSS para dar estilo al sitio | Tailwind CSS 4 en todo el sitio. Bootstrap se eliminó |
| Repositorio `supermercado-nombre-apellido-siglaCurso` | `supermercado-diego-carvajal-pfy2202`, publicado en GitHub Pages |

## El estado global

El estado vive en `src/contexto/` y usa las herramientas de la guía de la semana: `useContext` para
llegar a él desde cualquier componente y `useReducer` para concentrar sus cambios.

```
main.jsx
└── InventarioProvider            useReducer + localStorage; entrega el valor por contexto
    └── App → páginas             const { articulos, agregarArticulo } = useInventario();
```

- **`inventarioReducer.js`**: función pura con las tres acciones que cambian la lista: `agregar`,
  `ajustar-stock` y `restablecer`.
- **`InventarioContext.js`**: crea el contexto y exporta el hook `useInventario()`, que avisa con un
  error claro si se usa fuera del proveedor.
- **`InventarioProvider.jsx`**: crea el estado, expone `articulos`, `modificado`, `agregarArticulo`,
  `ajustarStock` y `restablecer`, y guarda la lista en `localStorage`. Al abrir el sitio revisa lo
  guardado y lo descarta si no tiene la forma esperada.

Cómo se reparten los datos: el panel, la lista, el formulario y el detalle leen el **mismo** estado,
sin pasarlo por props entre páginas. Un artículo ingresado en el formulario aparece primero en la
lista y, si está bajo su mínimo, también en «Por reponer» del inicio; las cifras se recalculan solas.

La lista sigue usando estado local para lo que solo le importa a ella (el mensaje para el lector de
pantalla), y los filtros siguen en la URL. Cada dato vive donde se necesita.

## Tailwind CSS

- Se instaló **Tailwind CSS 4** con el plugin `@tailwindcss/vite`. La guía usa la versión 3, con
  `tailwind.config.js` y las directivas `@tailwind`; en la versión 4 se configura en CSS, con
  `@import "tailwindcss"` y `@theme`, sin archivo de configuración aparte.
- `src/estilos.css` tiene solo el tema y unas reglas base. `--color-*: initial` borra la paleta de
  Tailwind y deja únicamente los colores del sitio: `blanco`, `lienzo`, `borde`, `suave`, `tinta`,
  `acento` y `alerta` (`bg-tinta`, `text-suave`, `border-borde`...).
- El estilo se escribe con clases de utilidad en cada componente. Las combinaciones que se repiten
  (botones, campos, paneles) están en `src/utilidades/estilos.js`.
- Diseño responsivo con las variantes de Tailwind: `md:grid-cols-4` en las cifras y `max-md:` para
  convertir cada fila de la tabla en un bloque con la etiqueta de cada dato en el teléfono.
- El CSS final pesa 17 KB (4,3 KB comprimido): Tailwind solo genera las clases que se usan. La hoja
  de Bootstrap que se cargaba antes pesa unos 230 KB.

## Cómo se usa React Router

- **`BrowserRouter`** (en `main.jsx`) envuelve la aplicación con `basename` igual a la base de Vite,
  porque GitHub Pages sirve el sitio dentro de `/supermercado-diego-carvajal-pfy2202/`.
- **`Routes` y `Route`** (en `App.jsx`) declaran las rutas. Todas cuelgan de una **ruta de diseño**
  (`<Route element={<Plantilla />}>`) con la cabecera, el pie y el menú inferior, y un **`<Outlet />`**
  donde va la página actual. La ruta `*` va al final y atrapa las direcciones que no existen.
- **Dos menús con `NavLink`**: marcan la página abierta con `aria-current="page"`. `useMatch` mantiene
  marcada «Lista de artículos» mientras se ve el detalle de un artículo.
- **Ruta dinámica** `articulo/:id`: `DetalleArticulo` lee el `:id` con **`useParams`** y busca el
  artículo en el estado global.
- **`useNavigate`**: al guardar, el formulario navega a la lista y le pasa en `state` el id del artículo
  nuevo, que aparece resaltado con un aviso. También se usa en «Volver a la página anterior».
- **`useSearchParams`** guarda los filtros en la URL. Escribir en el buscador reemplaza la entrada del
  historial (`replace`); elegir un tipo la agrega, así el botón Atrás vuelve al filtro anterior.
- **`Link` con `state`**: al abrir un artículo, el enlace lleva los filtros activos y «Artículos»
  (en la ruta de navegación del detalle) regresa a la misma vista filtrada.
- **Al cambiar de página** la `Plantilla` vuelve arriba y lleva el foco al contenido, y cada página
  cambia el título de la pestaña (`useTituloPagina`).
- **GitHub Pages y las rutas**: Pages no conoce las rutas de React Router; al recargar `/articulos`
  busca un archivo con ese nombre. Al construir, `vite.config.js` copia `index.html` por cada ruta fija
  (`articulos.html`, `articulo/<id>.html`...), que Pages sirve con estado 200, y como `404.html`, que
  atiende el resto: responde 404, carga la misma aplicación y React Router muestra lo que corresponda.
  Por eso un artículo **ingresado por la persona** se ve bien al recargar su detalle, pero esa carga
  directa llega con estado 404: ese artículo solo existe en su navegador, no como archivo del sitio.

## Estructura del proyecto

```
supermercado-diego-carvajal-pfy2202/
├── index.html                    Página que monta React
├── vite.config.js                Tailwind, base de GitHub Pages y copias de index.html
├── public/favicon.svg
├── src/
│   ├── main.jsx                  BrowserRouter e InventarioProvider
│   ├── App.jsx                   Declaración de rutas
│   ├── estilos.css               Tema de Tailwind y reglas base
│   ├── contexto/                 Estado global
│   │   ├── InventarioContext.js  Contexto y hook useInventario
│   │   ├── InventarioProvider.jsx useReducer y guardado en localStorage
│   │   └── inventarioReducer.js  Acciones que cambian la lista
│   ├── paginas/                  Una por ruta
│   │   ├── Inicio.jsx            Home: panel del inventario
│   │   ├── ListaArticulos.jsx    Tabla de todos los artículos
│   │   ├── IngresarArticulo.jsx  Página del formulario
│   │   ├── DetalleArticulo.jsx   Ruta dinámica /articulo/:id
│   │   ├── QuienesSomos.jsx
│   │   ├── NuestrasTiendas.jsx
│   │   └── NoEncontrada.jsx      Ruta *
│   ├── componentes/              Piezas de las páginas
│   │   ├── Plantilla.jsx         Cabecera + Outlet + pie + menú inferior
│   │   ├── Cabecera.jsx  MenuArticulos.jsx  MenuInferior.jsx
│   │   ├── ResumenInventario.jsx  FiltrosArticulos.jsx  TablaArticulos.jsx
│   │   ├── FormularioArticulo.jsx  Campo.jsx  FormularioMovimiento.jsx
│   │   └── EstadoStock.jsx  BotonRestablecer.jsx  TarjetaTienda.jsx
│   ├── hooks/                    useTituloPagina
│   ├── datos/                    articulos.js (tipos y artículos de ejemplo), tiendas.js
│   └── utilidades/               formato, inventario, validaciones y estilos (clases de Tailwind)
└── capturas/                     semana-1 y semana-2: evidencias de cada entrega
```

## Cómo ejecutarlo

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173/supermercado-diego-carvajal-pfy2202/
```

Otros comandos:

```bash
npm run build      # deja la versión publicable en dist/ (con una página por ruta y 404.html)
npm run preview    # sirve dist/ en http://localhost:4173/supermercado-diego-carvajal-pfy2202/
npm run lint       # revisa el código con oxlint
npm run deploy     # construye y publica dist/ en la rama gh-pages
```

## Verificación

- W3C Nu HTML Checker: 0 errores y 0 advertencias en el DOM publicado en 9 estados del sitio (inicio,
  lista, lista sin resultados, formulario, detalle, artículo inexistente, quiénes somos, tiendas por
  región y página no encontrada).
- Lighthouse sobre el sitio publicado: 100 en accesibilidad, buenas prácticas y SEO en inicio, lista,
  ingresar artículo, detalle, quiénes somos y nuestras tiendas, en escritorio o teléfono.
- GitHub Pages responde 200 al abrir directo las rutas fijas y 404 en las direcciones que no existen.
- `oxlint`: sin avisos.
- Recorrido en Chrome a 1280 px y 375–390 px: formulario vacío, con duplicado y con número inválido;
  artículo guardado y resaltado en la lista; cifras e «Por reponer» actualizados en el inicio; búsqueda
  por marca; ajuste de stock; entrada y salida en el detalle; recarga con los datos conservados;
  restablecer con confirmación; y los dos menús sin recargar la página. Sin desborde horizontal a 390 px.

## Diseño

El mismo diseño sobrio de la Semana 1, ahora escrito con Tailwind: una sola tipografía (Inter), cinco
neutros y un acento verde (`#166534`); el rojo `#b02a37` se reserva para las alertas. Sin degradados ni
sombras: la estructura se marca con espacio en blanco y líneas de 1 px.

## Historial del proyecto

| Semana | Entrega | Qué se agregó |
|---|---|---|
| 1 | Utilizando tecnologías avanzadas de React en sitios web | Sitio con React Router: inventario, detalle por ruta dinámica, Quiénes somos, Nuestras tiendas, página no encontrada y menú inferior |
| 2 | Implementando gestión de estado en componentes frontend con React | Estado global con Context y `useReducer`, menú de artículos, lista de artículos, formulario de ingreso, panel de inicio y migración de Bootstrap a Tailwind CSS |

```bash
git log --oneline          # ver los commits de cada semana
git checkout <hash>        # situarse en la entrega de esa semana
git checkout main          # volver al estado actual
```

## Autor

Diego Carvajal — Desarrollo Frontend II (PFY2202), Duoc UC.
