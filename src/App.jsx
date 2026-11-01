// Componente raíz: declara las rutas del sitio. Todas las páginas comparten la
// Plantilla (cabecera con el menú de artículos, contenido y menú inferior); React Router
// elige qué página dibujar dentro de ella según la URL, sin recargar el navegador.
import { Routes, Route } from 'react-router-dom';
import Plantilla from './componentes/Plantilla.jsx';
import Inicio from './paginas/Inicio.jsx';
import ListaArticulos from './paginas/ListaArticulos.jsx';
import IngresarArticulo from './paginas/IngresarArticulo.jsx';
import DetalleArticulo from './paginas/DetalleArticulo.jsx';
import QuienesSomos from './paginas/QuienesSomos.jsx';
import NuestrasTiendas from './paginas/NuestrasTiendas.jsx';
import NoEncontrada from './paginas/NoEncontrada.jsx';

function App() {
    return (
        <Routes>
            {/* Ruta de diseño: no agrega nada a la URL, solo envuelve a sus hijas */}
            <Route element={<Plantilla />}>
                <Route index element={<Inicio />} />
                <Route path="articulos" element={<ListaArticulos />} />
                <Route path="ingresar-articulo" element={<IngresarArticulo />} />
                {/* Ruta dinámica: :id toma el identificador del artículo desde la URL */}
                <Route path="articulo/:id" element={<DetalleArticulo />} />
                <Route path="quienes-somos" element={<QuienesSomos />} />
                <Route path="nuestras-tiendas" element={<NuestrasTiendas />} />
                {/* Cualquier otra dirección. Va al final para que primero se prueben las anteriores */}
                <Route path="*" element={<NoEncontrada />} />
            </Route>
        </Routes>
    );
}

export default App;
