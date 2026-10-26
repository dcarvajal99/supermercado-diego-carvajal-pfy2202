// Página para cualquier dirección que no coincide con una ruta (path="*").
// useNavigate permite navegar desde el código: aquí, volver a la página anterior.
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTituloPagina } from '../hooks/useTituloPagina.js';

function NoEncontrada() {
    useTituloPagina('Página no encontrada');
    const { pathname, key } = useLocation();
    const navegar = useNavigate();

    // React Router marca con la key 'default' la primera página de la visita: si se llegó
    // aquí directo, no hay una página anterior dentro del sitio y el botón no se muestra.
    const hayAnterior = key !== 'default';

    return (
        <div className="encabezado-pagina">
            <h1>Página no encontrada</h1>
            <p>
                La dirección <code>{pathname}</code> no existe en el sitio. Puede que el enlace esté mal
                escrito o que la página se haya movido.
            </p>
            <div className="d-flex flex-wrap gap-2">
                <Link to="/" className="btn btn-dark">Ir al inventario</Link>
                {hayAnterior && (
                    <button type="button" className="btn btn-outline-dark" onClick={() => navegar(-1)}>
                        Volver a la página anterior
                    </button>
                )}
            </div>
        </div>
    );
}

export default NoEncontrada;
