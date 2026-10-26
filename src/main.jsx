// Punto de entrada: React toma el <div id="raiz"> del index.html y dibuja la aplicación.
// BrowserRouter envuelve todo para que cualquier componente pueda leer la URL y navegar.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './estilos.css';

// En GitHub Pages el sitio vive en /supermercado-diego-carvajal-pfy2202/. basename le
// indica a React Router que las rutas empiezan después de esa carpeta, con la misma
// base que usa Vite (vite.config.js).
createRoot(document.getElementById('raiz')).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
        </BrowserRouter>
    </StrictMode>
);
