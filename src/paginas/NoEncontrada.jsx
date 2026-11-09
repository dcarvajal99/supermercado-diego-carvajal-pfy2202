// Página para cualquier dirección que no coincide con una ruta (path="*").
// useNavigate permite navegar desde el código: aquí, volver a la página anterior.
import { useLocation, useNavigate } from 'react-router';
import Boton from '../componentes/Boton.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { TITULO_PAGINA } from '../utilidades/estilos.js';

function NoEncontrada() {
    useTituloPagina('Página no encontrada');
    const { pathname, key } = useLocation();
    const navegar = useNavigate();

    // React Router marca con la key 'default' la primera página de la visita: si se llegó
    // aquí directo, no hay una página anterior dentro del sitio y el botón no se muestra.
    const hayAnterior = key !== 'default';

    return (
        <>
            <h1 className={TITULO_PAGINA}>Página no encontrada</h1>
            <p className="mt-2 mb-4">
                La dirección <code className="rounded bg-borde px-1 py-0.5 text-sm">{pathname}</code> no existe
                en el sitio. Puede que el enlace esté mal escrito o que la página se haya movido.
            </p>
            <div className="flex flex-wrap gap-2">
                <Boton ruta="/" variante="principal">Ir al inicio</Boton>
                {hayAnterior && <Boton onClick={() => navegar(-1)}>Volver a la página anterior</Boton>}
            </div>
        </>
    );
}

export default NoEncontrada;
