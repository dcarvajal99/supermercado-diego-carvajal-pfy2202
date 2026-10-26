// Cabecera del sitio: el logotipo lleva al home desde cualquier página.
// Link reemplaza a <a href>: cambia la URL sin recargar el navegador.
import { Link } from 'react-router-dom';

function Cabecera() {
    return (
        <header className="cabecera">
            <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2 py-3">
                <Link to="/" className="marca">
                    <svg className="marca-icono" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
                        <rect width="32" height="32" rx="8" />
                        <path d="M9.5 22.5C9.5 14.5 14.5 10 23 9c-.5 8.5-5 13.5-13.5 13.5Z" />
                        <path d="M9.5 22.5 17 15" />
                    </svg>
                    <span>Despensa Austral</span>
                </Link>
                <p className="mb-0 small text-secondary">Gestión de inventario</p>
            </div>
        </header>
    );
}

export default Cabecera;
