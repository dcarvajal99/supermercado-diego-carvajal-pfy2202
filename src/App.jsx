// Componente raíz: arma los proveedores que necesita todo el sitio y deja las rutas a
// AppRoutes. BrowserRouter permite a cualquier componente leer la URL y navegar, e
// InventarioProvider le entrega el estado global. Como envuelven a las rutas, no se
// desmontan al cambiar de página.
import { BrowserRouter } from 'react-router';
import InventarioProvider from './contexto/InventarioProvider.jsx';
import AppRoutes from './rutas/AppRoutes.jsx';

function App() {
    // En GitHub Pages el sitio vive en /supermercado-diego-carvajal-pfy2202/. basename le
    // indica a React Router que las rutas empiezan después de esa carpeta, con la misma
    // base que usa Vite (vite.config.js).
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <InventarioProvider>
                <AppRoutes />
            </InventarioProvider>
        </BrowserRouter>
    );
}

export default App;
