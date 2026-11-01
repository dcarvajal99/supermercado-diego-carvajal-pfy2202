// Cabecera del sitio: el logotipo lleva al inicio desde cualquier página y a su lado va
// el menú de artículos. Link reemplaza a <a href>: cambia la URL sin recargar el navegador.
import { Link } from 'react-router-dom';
import MenuArticulos from './MenuArticulos.jsx';
import { CONTENEDOR } from '../utilidades/estilos.js';

function Cabecera() {
    return (
        <header className="border-b border-borde bg-blanco">
            <div className={CONTENEDOR + ' flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3'}>
                <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-semibold text-tinta">
                    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
                        <rect className="fill-acento" width="32" height="32" rx="8" />
                        <g className="fill-none stroke-blanco" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.5 22.5C9.5 14.5 14.5 10 23 9c-.5 8.5-5 13.5-13.5 13.5Z" />
                            <path d="M9.5 22.5 17 15" />
                        </g>
                    </svg>
                    <span>Despensa Austral</span>
                </Link>
                <MenuArticulos />
            </div>
        </header>
    );
}

export default Cabecera;
