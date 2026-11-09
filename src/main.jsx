// Punto de entrada: React toma el <div id="raiz"> del index.html y dibuja la aplicación.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './estilos.css';

createRoot(document.getElementById('raiz')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
