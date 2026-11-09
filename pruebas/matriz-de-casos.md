# Matriz de casos esperados

Recorrido de los datos y resultado esperado para navegación, validación, persistencia, stock y
carrito. Cada caso indica qué módulo es **responsable** del resultado y **cómo se verifica**:
con una prueba automática (`npm test`, el código del caso aparece en el nombre de la prueba) o
con un recorrido en el navegador.

## Recorrido de los datos

```
Formulario / botón  →  función de la página  →  acción (contexto/acciones.js)
   →  inventarioReducer (transición pura, marca modificado)  →  nuevo estado
   →  usePersistencia (guarda o borra en localStorage)  →  páginas que leen useInventario()
```

Las reglas que se repiten viven en un solo lugar: los límites del stock en
`utilidades/inventario.js` (`stockValido`, `recortarStock`, `cambioPermitido`) y los patrones de
los campos en `utilidades/validaciones.js` (`PATRONES`).

## Navegación — `rutas/AppRoutes.jsx`, `rutas/paginasPublicadas.js`

| N° | Caso | Resultado esperado | Responsable | Verificación |
|---|---|---|---|---|
| N1 | Abrir `/`, `/articulos`, `/ingresar-articulo`, `/carrito`, `/quienes-somos`, `/nuestras-tiendas` | Cada dirección llega a su página | `ARBOL_RUTAS` | `rutas.test.jsx` |
| N2 | Abrir `/articulo/palta-hass` | Ruta dinámica `articulo/:id` con `id = palta-hass` | `ARBOL_RUTAS` | `rutas.test.jsx` |
| N3 | Abrir `/ofertas`, `/articulo` o `/articulos/extra` | Página no encontrada (`*`) | `ARBOL_RUTAS` | `rutas.test.jsx` |
| N4 | Agregar o quitar una ruta fija | La lista de páginas publicadas debe cambiar igual | `paginasPublicadas.js` | `rutas.test.jsx` |
| N5 | Cambiar los artículos de ejemplo | Se publica el detalle de cada uno, ni más ni menos | `paginasPublicadas.js` | `rutas.test.jsx` |
| N6 | Navegar con los menús, la tabla y la ruta de navegación | La página cambia sin recargar el documento | `Link`, `NavLink` | Navegador |
| N7 | Elegir una categoría y luego pulsar Atrás | Vuelve la categoría anterior | `useSearchParams` | Navegador |
| N8 | Recargar una ruta publicada en GitHub Pages | Estado 200 y la misma página | `vite.config.js` + `paginasPublicadas.js` | Navegador |

## Validación — `utilidades/validaciones.js`

| N° | Caso | Resultado esperado | Responsable | Verificación |
|---|---|---|---|---|
| V1 | Nombres, marcas y formatos de los artículos de ejemplo | Cumplen los patrones | `PATRONES` | `validaciones.test.js` |
| V2 | Artículo completo y correcto | Sin errores | `validarArticulo` | `validaciones.test.js` |
| V3 | Formulario vacío | Siete errores, en el orden del formulario | `validarArticulo` | `validaciones.test.js` |
| V4 | Nombre `<script>`, `Té` o de 61 caracteres | Error en el nombre; `Ñoquis de papa` se acepta | `PATRONES.nombre` | `validaciones.test.js` |
| V5 | Marca `A` o `Marca#1` | Error en la marca; `Casa & Co` se acepta | `PATRONES.marca` | `validaciones.test.js` |
| V6 | Formato `un kilo`, `kg 1`, `1 kilos` | Error; `1 kg`, `500 ml`, `1,6 L`, `12 rollos` se aceptan | `PATRONES.formato` | `validaciones.test.js` |
| V7 | Precio `45.90`, `4.590`, `1e3`, `-5`, `0` | Error: pesos enteros entre $1 y $999.999 | `PATRONES.precio` + rango | `validaciones.test.js` |
| V8 | Stock `2.5` o `10000` | Error de decimales o de rango | `PATRONES.entero` + `stockValido` | `validaciones.test.js` |
| V9 | Mismo nombre, marca y formato con otras mayúsculas | Error de artículo repetido | `esDuplicado` | `validaciones.test.js` |
| V10 | Guardar el formulario con errores | Cada error junto a su campo y el foco en el primero | `useFocoCampos` | Navegador |

## Persistencia — `contexto/persistencia.js`, `hooks/usePersistencia.js`

| N° | Caso | Resultado esperado | Responsable | Verificación |
|---|---|---|---|---|
| P1 | Primera visita, sin nada guardado | Datos de ejemplo | `leerEstadoGuardado` | `persistencia.test.js` |
| P2 | Guardar y volver a leer | El mismo estado | `guardarEstado` | `persistencia.test.js` |
| P3 | JSON roto en localStorage | Se descarta: datos de ejemplo | `leerEstadoGuardado` | `persistencia.test.js` |
| P4 | Carrito con un artículo que no existe | Se descarta | `esEstadoValido` | `persistencia.test.js` |
| P5 | Stock negativo guardado | Se descarta | `esEstadoValido` + `stockValido` | `persistencia.test.js` |
| P6 | Navegador con lo guardado por la Semana 2 | Se aprovechan los artículos con el carrito vacío | `leerEstadoGuardado` | `persistencia.test.js` |
| P7 | Restablecer | Se borra lo guardado (también la clave de la Semana 2) | `borrarEstado` | `persistencia.test.js` |
| P8 | Almacenamiento bloqueado o lleno | El sitio sigue funcionando | `try/catch` | `persistencia.test.js` |
| P9 | Agregar al carrito y recargar | El carrito y el stock se conservan | `usePersistencia` | Navegador |

## Stock — `utilidades/inventario.js`, `contexto/inventarioReducer.js`

| N° | Caso | Resultado esperado | Responsable | Verificación |
|---|---|---|---|---|
| K1 | Recortar −3, 5 y 10.500 | 0, 5 y 9.999 | `recortarStock` | `stock.test.js` |
| K2 | Valores 2,5, −1 o 10.000 | No son un stock válido | `stockValido` | `stock.test.js` |
| K3 | Cambios que dejarían el stock fuera de rango | No se permiten | `cambioPermitido` | `stock.test.js` |
| S1 | Entrada de 5 y salida de 4 | Stock 14 y 5 (desde 9) | `ajustar-stock` | `inventarioReducer.test.js` |
| S2 | Salida de 50 o entrada de 20.000 | Stock 0 y 9.999 | `cambiarStock` + `recortarStock` | `inventarioReducer.test.js` |
| S3 | Agregar un artículo | Queda primero, con SKU `ABA-005` | `crearArticulo` + `agregar-articulo` | `inventarioReducer.test.js` |
| S4 | Salida mayor que el stock en el formulario | Mensaje de error, el stock no cambia | `cambioPermitido` | Navegador |

## Carrito — `contexto/inventarioReducer.js`

| N° | Caso | Resultado esperado | Responsable | Verificación |
|---|---|---|---|---|
| C1 | Agregar 3 paltas | Stock 6, carrito 3 | `mover-al-carrito` | `inventarioReducer.test.js` |
| C2 | Agregar más que el stock | El estado no cambia | `moverAlCarrito` | `inventarioReducer.test.js` |
| C3 | Restar una en el carrito | La unidad vuelve al stock | `mover-al-carrito` negativo | `inventarioReducer.test.js` |
| C4 | Quitar el artículo | Vuelven todas sus unidades y la línea desaparece | `quitar-del-carrito` | `inventarioReducer.test.js` |
| C5 | Vaciar el carrito | El inventario vuelve a como estaba | `vaciar-carrito` | `inventarioReducer.test.js` |
| C6 | Finalizar la compra | Carrito vacío, unidades descontadas | `finalizar-compra` | `inventarioReducer.test.js` |
| C7 | Cualquier secuencia de agregar y restar | Stock + carrito se conserva | `moverAlCarrito` | `inventarioReducer.test.js` |
| C8 | Stock agotado | «Agregar al carrito» y «+» deshabilitados | `FormularioCarrito`, `LineaCarrito` | Navegador |

## Bandera de cambios — `contexto/inventarioReducer.js`

| N° | Caso | Resultado esperado | Responsable | Verificación |
|---|---|---|---|---|
| B1 | Estado inicial | `modificado: false` | `ESTADO_INICIAL` | `inventarioReducer.test.js` |
| B2 | Un cambio real | `modificado: true` | `inventarioReducer` | `inventarioReducer.test.js` |
| B3 | Acción que no cambia nada (salida sin stock, finalizar sin carrito) | El mismo estado, sin marcar | `inventarioReducer` | `inventarioReducer.test.js` |
| B4 | Restablecer | Datos de ejemplo y `modificado: false` | `restablecer` | `inventarioReducer.test.js` |
| B5 | Acción desconocida | Error del programa | `inventarioReducer` | `inventarioReducer.test.js` |
| B6 | «Restablecer datos de ejemplo» en la lista | Aparece solo con `modificado: true` | `ListaArticulos` | Navegador |
