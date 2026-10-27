// Plantilla común a todas las páginas: cabecera, contenido, pie y menú inferior.
// <Outlet /> es el hueco donde React Router dibuja la página de la ruta actual.
// El inventario vive aquí porque la plantilla no se desmonta al cambiar de página:
// el stock ajustado en el detalle de un producto sigue igual al volver al home.
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Cabecera from './Cabecera.jsx';
import MenuInferior from './MenuInferior.jsx';
import { useInventario } from '../hooks/useInventario.js';

function Plantilla() {
    const inventario = useInventario();
    const { pathname } = useLocation();
    const contenido = useRef(null);
    const rutaAnterior = useRef(pathname);

    // Al cambiar de página: volver arriba y llevar el foco al contenido, para que el
    // teclado y el lector de pantalla partan desde la página nueva y no desde el menú.
    // No corre al abrir el sitio ni cuando solo cambian los filtros (?categoria=...).
    useEffect(() => {
        if (rutaAnterior.current === pathname) return;
        rutaAnterior.current = pathname;
        // instant: sin la animación de scroll-behavior: smooth de Bootstrap, la página
        // nueva aparece arriba de inmediato.
        window.scrollTo({ top: 0, behavior: 'instant' });
        contenido.current?.focus({ preventScroll: true });
    }, [pathname]);

    return (
        <>
            <a className="saltar visually-hidden-focusable" href="#contenido">Saltar al contenido</a>
            <Cabecera />
            <main id="contenido" className="container contenido" ref={contenido} tabIndex={-1}>
                {/* context: las páginas reciben el inventario con useOutletContext() */}
                <Outlet context={inventario} />
            </main>
            <footer className="pie container">
                <p className="mb-0">
                    Despensa Austral es un supermercado ficticio, creado para la asignatura
                    Desarrollo Frontend II (PFY2202) de Duoc UC.
                </p>
            </footer>
            <MenuInferior />
        </>
    );
}

export default Plantilla;
