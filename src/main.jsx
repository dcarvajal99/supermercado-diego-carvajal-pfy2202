// Punto de entrada: React toma el <div id="raiz"> del index.html y dibuja la aplicación.
// BrowserRouter permite a cualquier componente leer la URL y navegar, e InventarioProvider
// le entrega el estado global. Como envuelven a App, no se desmontan al cambiar de página.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import InventarioProvider from './contexto/InventarioProvider.jsx';
import './estilos.css';

// En GitHub Pages el sitio vive en /supermercado-diego-carvajal-pfy2202/. basename le
// indica a React Router que las rutas empiezan después de esa carpeta, con la misma
// base que usa Vite (vite.config.js).
createRoot(document.getElementById('raiz')).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <InventarioProvider>
                <App />
            </InventarioProvider>
        </BrowserRouter>
    </StrictMode>
);
