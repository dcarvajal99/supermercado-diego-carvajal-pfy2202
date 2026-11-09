// Archivo central de rutas: todas las direcciones del sitio se declaran aquí.
// Todas cuelgan de la Plantilla (cabecera, contenido y menú inferior) y React Router elige
// qué página dibujar dentro de ella según la URL, sin recargar el navegador.
//
// Cada página se carga bajo demanda con lazy(): su código se descarga recién la primera
// vez que se visita. Así la carga inicial del sitio es más liviana. El Suspense que muestra
// «Cargando…» mientras tanto está en la Plantilla.
import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Plantilla from '../componentes/Plantilla.jsx';

const Inicio = lazy(() => import('../paginas/Inicio.jsx'));
const ListaArticulos = lazy(() => import('../paginas/ListaArticulos.jsx'));
const IngresarArticulo = lazy(() => import('../paginas/IngresarArticulo.jsx'));
const DetalleArticulo = lazy(() => import('../paginas/DetalleArticulo.jsx'));
const Carrito = lazy(() => import('../paginas/Carrito.jsx'));
const QuienesSomos = lazy(() => import('../paginas/QuienesSomos.jsx'));
const NuestrasTiendas = lazy(() => import('../paginas/NuestrasTiendas.jsx'));
const NoEncontrada = lazy(() => import('../paginas/NoEncontrada.jsx'));

// Árbol de rutas. Se exporta aparte para que las pruebas (pruebas/rutas.test.jsx) comprueben
// qué ruta responde a cada dirección, sin dibujar páginas.
// Ruta de diseño: no agrega nada a la URL, solo envuelve a sus hijas.
export const ARBOL_RUTAS = (
    <Route element={<Plantilla />}>
        <Route index element={<Inicio />} />
        <Route path="articulos" element={<ListaArticulos />} />
        <Route path="ingresar-articulo" element={<IngresarArticulo />} />
        {/* Ruta dinámica: :id toma el identificador del artículo desde la URL */}
        <Route path="articulo/:id" element={<DetalleArticulo />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="nuestras-tiendas" element={<NuestrasTiendas />} />
        {/* Cualquier otra dirección. Va al final para que primero se prueben las anteriores */}
        <Route path="*" element={<NoEncontrada />} />
    </Route>
);

function AppRoutes() {
    return <Routes>{ARBOL_RUTAS}</Routes>;
}

export default AppRoutes;
