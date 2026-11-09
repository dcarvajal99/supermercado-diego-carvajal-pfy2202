# Despensa Austral — Semana 3

> **Sitio publicado:** https://dcarvajal99.github.io/supermercado-diego-carvajal-pfy2202/
> **Repositorio:** https://github.com/dcarvajal99/supermercado-diego-carvajal-pfy2202

Actividad sumativa «Desarrollando sitios web con React avanzado» de la asignatura
**Desarrollo Frontend II (PFY2202)**, Duoc UC. Exp 1 — Semana 3.

Sitio de **gestión de inventario** para Despensa Austral, un supermercado ficticio del sur de Chile,
construido con **React 19**, **React Router 7**, **Tailwind CSS 4** y **Vite**. Esta semana se suma
un **filtro por categoría** en la lista de artículos, el **detalle** de cada artículo con la opción de
**agregarlo al carrito**, y una pantalla de **carrito de compras**. Cada unidad que entra al carrito
sale del inventario, y vuelve si se quita.

---

## Observaciones de la revisión de la Semana 2

El profesor revisó la entrega de la Semana 2 y propuso siete mejoras. Se aplicaron sobre el sitio
actual:

| Observación | Cómo se resolvió |
|---|---|
| Importar la navegación desde `react-router`, verificando la versión instalada | Se verificó la versión: 7.18.4. Se reemplazó `react-router-dom` por `react-router` en esa misma versión y todos los imports salen de `react-router`. Se mantiene la v7, porque la v8 exige Node 22.22 o superior |
| Expresiones regulares para nombre, marca, formato y precio | `PATRONES` en `utilidades/validaciones.js` declara caracteres y largos admitidos (por ejemplo, el precio solo con dígitos: pesos enteros, sin puntos ni decimales). Los rangos se siguen revisando aparte |
| Detectar modificaciones con una bandera explícita, no con `JSON.stringify` | El estado tiene `modificado`. El reductor lo enciende solo cuando una acción cambia algo de verdad y `restablecer` lo apaga. También decide la persistencia: con cambios se guarda; sin cambios se borra lo guardado |
| Foco mediante referencias, no con `document.getElementById` | Hook `useFocoCampos`: cada campo se registra con su nombre (`ref`) y el formulario enfoca el primer error por ese nombre |
| Separar persistencia y acciones del proveedor | `contexto/persistencia.js` (leer, guardar y borrar, sin React), `hooks/usePersistencia.js` (cuándo guardar), `contexto/acciones.js` (creadores de acciones) y un reductor puro. El artículo nuevo se arma con `crearArticulo()` antes de despachar |
| Desacoplar la construcción de los datos del inventario | `vite.config.js` lee `rutas/paginasPublicadas.js`, una lista propia de la construcción. Una prueba avisa si deja de coincidir con las rutas o con los artículos de ejemplo |
| Centralizar los límites de stock | `stockValido`, `recortarStock` y `cambioPermitido` en `utilidades/inventario.js`; los usan el reductor, el formulario de movimientos, la validación y la lectura de lo guardado |

Siguiendo la recomendación de la revisión, se elaboró una **matriz de casos esperados** para
navegación, validación, persistencia, stock y carrito, con el módulo responsable de cada resultado:
[`pruebas/matriz-de-casos.md`](pruebas/matriz-de-casos.md). La mayoría de los casos tiene una
prueba automática con Vitest (`npm test`, 40 pruebas). Al escribirlas apareció un error real: una
salida sobre un artículo sin stock marcaba el inventario como modificado aunque nada cambiara. Se
corrigió en el reductor.

## Rutas del sitio

| Ruta | Página | Menú | Qué muestra |
|---|---|---|---|
| `/` | Inicio | Inferior | Panel: cifras del inventario y artículos por reponer |
| `/articulos` | Lista de artículos | Artículos | Tabla de todos los artículos con filtro por categoría, búsqueda y estado del stock |
| `/articulo/:id` | Detalle del artículo | — | Ruta dinámica: datos del artículo, agregar al carrito y ajuste de inventario |
| `/carrito` | Carrito de compras | Artículos | Artículos agregados, con cantidades, subtotales, total, vaciar y finalizar compra |
| `/ingresar-articulo` | Ingresar artículo | Artículos | Formulario para agregar un artículo al inventario |
| `/quienes-somos` | Quiénes somos | Inferior | Historia, cifras, misión, visión y valores del supermercado |
| `/nuestras-tiendas` | Nuestras tiendas | Inferior | Las 5 sucursales, filtrables por región |
| cualquier otra | Página no encontrada | — | Aviso con la dirección pedida y enlaces para volver |

Los filtros viajan en la URL, así que se pueden compartir y sobreviven a una recarga:
`/articulos?categoria=lacteos`, `/articulos?estado=bajo`, `/articulos?q=arroz`.

## Qué pide la actividad y cómo se resolvió

| Pide la actividad | Cómo se resolvió |
|---|---|
| Filtrar la lista según la categoría seleccionada | Botones de categoría con la cantidad de artículos de cada una. La categoría elegida queda en la URL (`?categoria=`) y `filtrarArticulos()` calcula una lista nueva |
| El filtro actualiza el estado sin perder los datos originales | La lista del estado global nunca se modifica: lo que se ve es un dato derivado (`useMemo`) a partir de la lista completa y los filtros. «Todas» vuelve a mostrar los 18 artículos |
| Al hacer clic en un artículo se muestra su detalle | El nombre de cada fila es un `Link` a `/articulo/:id`; `DetalleArticulo` lo busca con `useParams` |
| Desde el detalle se agrega al carrito | Panel «Agregar al carrito» con selector de cantidad (de 1 al stock disponible) |
| Lo agregado resta la cantidad disponible del inventario | La acción `mover-al-carrito` baja el stock y sube la cantidad del carrito en el mismo cambio de estado |
| Pantalla de carrito que lista lo agregado | `/carrito`: cada línea con precio, cantidad, lo que queda en inventario y subtotal, más un resumen con el total |
| Aumentar o disminuir cantidades actualiza el inventario | «+» y «−» mueven una unidad entre el carrito y el stock. «Quitar» y «Vaciar carrito» devuelven todo al inventario |
| Seguir usando un framework de CSS | Tailwind CSS 4 en todo el sitio, con componentes reutilizables (`Boton`, `GrupoOpciones`, `Aviso`) y diseño responsivo |
| Repositorio `supermercado-nombre-apellido-siglaCurso` | `supermercado-diego-carvajal-pfy2202`, publicado en GitHub Pages |

También se puede **finalizar la compra**: el carrito se vacía y las unidades quedan descontadas del
inventario. Todas las acciones que no se pueden deshacer piden confirmación.

## El estado global

El estado vive en `src/contexto/`: `useReducer` concentra los cambios y el contexto lo entrega a
cualquier componente con `useInventario()`.

```
App.jsx
└── BrowserRouter
    └── InventarioProvider        useReducer + usePersistencia; despacha las acciones de acciones.js
        └── AppRoutes → páginas   const { articulos, carrito, agregarAlCarrito } = useInventario();
```

| Archivo | Responsabilidad |
|---|---|
| `contexto/inventarioReducer.js` | Transiciones puras del estado `{ articulos, carrito, modificado }` |
| `contexto/acciones.js` | Creadores de acciones: arman cada `{ type, ... }` |
| `contexto/persistencia.js` | Leer, guardar y borrar en `localStorage`, con la revisión de lo guardado (sin React) |
| `hooks/usePersistencia.js` | Cuándo persistir: guarda si `modificado`, borra si no |
| `contexto/InventarioProvider.jsx` | Une las piezas y entrega el estado y las operaciones por contexto |
| `contexto/InventarioContext.js` | Contexto y hook `useInventario()` |

**Un solo estado para el inventario y el carrito.** Dependen uno del otro: cada unidad del carrito
sale del stock. Si fueran dos estados separados, un cambio podría actualizar uno y no el otro; en una
sola acción del reductor cambian juntos y nunca quedan desfasados. El carrito guarda solo
`{ id, cantidad }` y el resto de los datos se toma del inventario.

| Acción | Qué hace |
|---|---|
| `agregar-articulo` | Agrega un artículo nuevo al inventario (formulario de ingreso) |
| `ajustar-stock` | Entrada o salida registrada en el detalle |
| `mover-al-carrito` | Positiva: del inventario al carrito. Negativa: del carrito al inventario. Si no hay stock suficiente, no cambia nada |
| `quitar-del-carrito` | Devuelve al inventario todas las unidades de un artículo |
| `vaciar-carrito` | Devuelve todo el carrito al inventario |
| `finalizar-compra` | Vacía el carrito; las unidades quedan descontadas |
| `restablecer` | Vuelve a los datos de ejemplo, vacía el carrito y apaga `modificado` |

**Bandera `modificado`.** Cualquier acción que cambia algo de verdad la enciende; una acción que no
se puede aplicar (agregar al carrito sin stock, finalizar con el carrito vacío) devuelve el mismo
estado y no la marca. Con la bandera encendida se guarda el estado; apagada, se borra lo guardado.

**Lo local sigue siendo local.** La cantidad elegida en el detalle, el mensaje de confirmación o la
pregunta de un botón son estado de cada componente (`useState`): no se elevan porque nadie más los
necesita. Los filtros viven en la URL.

El estado se guarda en `localStorage` (`despensa-austral-inventario`) y se revisa al leerlo: si no
tiene la forma esperada (por ejemplo, un stock fuera de los límites o un carrito con artículos que no
existen), se usan los datos de ejemplo. Si el navegador trae lo que guardaba la
Semana 2 (solo la lista de artículos), se aprovecha con el carrito vacío.

## Organización del código

- **Rutas centralizadas** en `src/rutas/AppRoutes.jsx`, que exporta el árbol (`ARBOL_RUTAS`) para que
  las pruebas comprueben qué ruta atiende cada dirección. `App.jsx` solo arma los proveedores
  (`BrowserRouter` e `InventarioProvider`).
- **Carga diferida**: cada página se importa con `React.lazy()` y se descarga recién al visitarla.
  `Suspense`, en la `Plantilla`, muestra «Cargando…» mientras tanto, sin mover la cabecera ni los menús.
- **Componentes reutilizables**:

| Componente | Dónde se usa |
|---|---|
| `Boton` (variantes `principal` y `secundario`, tamaños `normal`, `chico` e `icono`; con `ruta` se dibuja como `Link`) | En todo el sitio |
| `SelectorCantidad` (− cantidad +) | Detalle (cuántas unidades agregar) y cada línea del carrito |
| `GrupoOpciones` (botones de opción única con `aria-pressed`) | Filtro de categorías y filtro de regiones de Nuestras tiendas |
| `BotonConfirmar` (pregunta antes de actuar) | Restablecer datos, vaciar carrito y finalizar compra |
| `Aviso` (mensaje con `role="status"`) | Artículo ingresado, agregado al carrito, movimiento registrado y compra registrada |
| `EstadoStock`, `Campo`, `LineaCarrito`, `TarjetaTienda` | Etiqueta de estado, campos de formulario, líneas del carrito y sucursales |

- **Funciones sin estado** en `src/utilidades/`: `inventario.js` (límites del stock, estado, resumen,
  filtros, conteo por categoría, creación de artículos), `carrito.js` (líneas, unidades y total),
  `formato.js`, `validaciones.js` (patrones y validación) y `estilos.js` (clases de Tailwind compartidas).
- **Hooks propios**: `useTituloPagina`, `usePersistencia` y `useFocoCampos`.

## Tailwind CSS

- **Tailwind CSS 4** con el plugin `@tailwindcss/vite`. La guía usa la versión 3 (`tailwind.config.js`);
  en la versión 4 el tema se escribe en CSS con `@theme`.
- `src/estilos.css` define el tema: `--color-*: initial` borra la paleta de Tailwind y deja solo los
  colores del sitio (`bg-tinta`, `text-suave`, `border-borde`...).
- En lugar de repetir clases, los botones salen del componente `Boton`, que elige las clases según la
  variante. Las variantes de estado de Tailwind marcan cada caso: `hover:`, `focus-visible:`,
  `aria-disabled:`, `not-aria-disabled:hover:`, `aria-[invalid=true]:` y `has-checked:`.
- Diseño responsivo con `sm:`, `md:` y `lg:`, y `max-md:` para que cada fila de la tabla sea un bloque
  en el teléfono. El carrito pasa de dos columnas (líneas y resumen) a una.
- El CSS final pesa 18 KB (4,5 KB comprimido): Tailwind solo genera las clases que se usan.

## Cómo se usa React Router

- Todo se importa desde el paquete **`react-router`** (versión 7.18.4), como indica la guía de
  actualización a la v7: `react-router-dom` ya no hace falta.
- **`BrowserRouter`** con `basename` igual a la base de Vite, porque GitHub Pages sirve el sitio dentro
  de `/supermercado-diego-carvajal-pfy2202/`.
- **Ruta de diseño** con la `Plantilla` y un **`<Outlet />`** para la página actual; la ruta `*` va al final.
- **Ruta dinámica** `articulo/:id` con **`useParams`**. Los enlaces «Anterior» y «Siguiente» recorren
  los artículos por la misma ruta.
- **`NavLink`** en los dos menús. **`useMatch`** mantiene marcado «Artículos» en el detalle.
- **`useSearchParams`** para los filtros, **`useNavigate`** al guardar un artículo nuevo y en «Volver a
  la página anterior», y **`Link` con `state`** para volver del detalle a la lista con los mismos filtros.
- **GitHub Pages y las rutas**: al construir, `vite.config.js` copia `index.html` por cada página de
  `rutas/paginasPublicadas.js` (`articulos.html`, `carrito.html`, `articulo/<id>.html`...), que Pages
  sirve con estado 200, y como `404.html` para el resto. Un artículo ingresado por la persona solo existe en su navegador: al
  recargar su detalle se ve bien, pero esa carga llega con estado 404.

## Estructura del proyecto

```
supermercado-diego-carvajal-pfy2202/
├── index.html                     Página que monta React
├── vite.config.js                 Tailwind, base de GitHub Pages y copias de index.html
├── src/
│   ├── main.jsx                   Monta <App />
│   ├── App.jsx                    BrowserRouter e InventarioProvider
│   ├── estilos.css                Tema de Tailwind y reglas base
│   ├── rutas/
│   │   ├── AppRoutes.jsx          Todas las rutas, con carga diferida
│   │   └── paginasPublicadas.js   Páginas que se copian para GitHub Pages
│   ├── contexto/                  Estado global
│   │   ├── InventarioContext.js   Contexto y hook useInventario
│   │   ├── InventarioProvider.jsx Une reductor, acciones y persistencia
│   │   ├── inventarioReducer.js   Transiciones puras de inventario y carrito
│   │   ├── acciones.js            Creadores de acciones
│   │   └── persistencia.js        localStorage: leer, guardar y borrar
│   ├── paginas/                   Inicio, ListaArticulos, DetalleArticulo, Carrito,
│   │                              IngresarArticulo, QuienesSomos, NuestrasTiendas, NoEncontrada
│   ├── componentes/               Plantilla, Cabecera, MenuArticulos, MenuInferior,
│   │                              Boton, BotonConfirmar, Aviso, GrupoOpciones, SelectorCantidad,
│   │                              FiltrosArticulos, TablaArticulos, FormularioCarrito, LineaCarrito,
│   │                              FormularioArticulo, Campo, FormularioMovimiento,
│   │                              ResumenInventario, EstadoStock, TarjetaTienda
│   ├── hooks/                     useTituloPagina, usePersistencia, useFocoCampos
│   ├── datos/                     articulos.js (categorías y artículos de ejemplo), tiendas.js
│   └── utilidades/                inventario, carrito, formato, validaciones y estilos
├── pruebas/                       Pruebas con Vitest y matriz-de-casos.md
└── capturas/                      semana-1, semana-2 y semana-3: evidencias de cada entrega
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
npm test           # corre las 40 pruebas de pruebas/ con Vitest
npm run deploy     # construye y publica dist/ en la rama gh-pages
```

## Verificación

- W3C Nu HTML Checker: 0 errores y 0 advertencias en el DOM publicado en 13 estados: las 11 páginas y
  filtros principales, el detalle con un artículo recién agregado al carrito y el carrito pidiendo
  confirmación de compra.
- Lighthouse sobre el sitio publicado: 100 en accesibilidad, buenas prácticas y SEO en la lista
  filtrada, el detalle y el carrito con artículos (escritorio y teléfono).
- `npm test`: 40 pruebas de Vitest pasan (validación, persistencia, stock, carrito, bandera y rutas);
  ver la matriz de casos.
- `oxlint` sin avisos y `npm audit` sin vulnerabilidades.
- GitHub Pages responde 200 al abrir directo las rutas fijas, incluido `/carrito`.
- Recorrido en Chrome a 1280 px y 375–390 px: filtro por categoría con Atrás y Adelante; detalle con
  cantidad limitada al stock; stock descontado en el detalle, la lista y el inicio; «+» y «−» en el
  carrito con el inventario actualizado; «+» deshabilitado sin stock; quitar, vaciar y finalizar con
  las unidades devueltas o descontadas; insignia del carrito en la cabecera; recarga con el carrito
  conservado; datos de la Semana 2 aprovechados y datos corruptos descartados. Sin desborde a 390 px.

## Historial del proyecto

| Semana | Entrega | Qué se agregó |
|---|---|---|
| 1 | Utilizando tecnologías avanzadas de React en sitios web | Sitio con React Router: inventario, detalle por ruta dinámica, Quiénes somos, Nuestras tiendas, página no encontrada y menú inferior |
| 2 | Implementando gestión de estado en componentes frontend con React | Estado global con Context y `useReducer`, menú de artículos, lista de artículos, formulario de ingreso, panel de inicio y migración de Bootstrap a Tailwind CSS |
| 3 | Desarrollando sitios web con React avanzado | Filtro por categoría, agregar al carrito desde el detalle, pantalla de carrito sincronizada con el inventario, finalizar compra, rutas centralizadas con carga diferida y componentes reutilizables. Después, las observaciones de la revisión de la Semana 2, con la matriz de casos y 40 pruebas automáticas |

```bash
git log --oneline          # ver los commits de cada semana
git checkout <hash>        # situarse en la entrega de esa semana
git checkout main          # volver al estado actual
```

## Autor

Diego Carvajal — Desarrollo Frontend II (PFY2202), Duoc UC.
