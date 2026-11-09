// Plantilla común a todas las páginas: cabecera, contenido, pie y menú inferior.
// <Outlet /> es el hueco donde React Router dibuja la página de la ruta actual. Como las
// páginas se cargan bajo demanda (lazy), Suspense muestra un aviso mientras llega su código;
// la cabecera y los menús quedan fijos y no parpadean.
import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import Cabecera from './Cabecera.jsx';
import MenuInferior from './MenuInferior.jsx';
import { CONTENEDOR } from '../utilidades/estilos.js';

function Plantilla() {
    const { pathname } = useLocation();
    const contenido = useRef(null);
    const rutaAnterior = useRef(pathname);

    // Al cambiar de página: volver arriba y llevar el foco al contenido, para que el
    // teclado y el lector de pantalla partan desde la página nueva y no desde el menú.
    // No corre al abrir el sitio ni cuando solo cambian los filtros (?categoria=...).
    useEffect(() => {
        if (rutaAnterior.current === pathname) return;
        rutaAnterior.current = pathname;
        window.scrollTo(0, 0);
        contenido.current?.focus({ preventScroll: true });
    }, [pathname]);

    return (
        <>
            <a
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-40 focus:rounded-md focus:bg-tinta focus:px-3 focus:py-2 focus:text-blanco"
                href="#contenido"
            >
                Saltar al contenido
            </a>
            <Cabecera />
            <main id="contenido" className={CONTENEDOR + ' pt-7 pb-8'} ref={contenido} tabIndex={-1}>
                {/* min-h-screen: mientras carga, el pie queda fuera de la vista y no salta al llegar la página */}
                <Suspense fallback={<p className="min-h-screen text-suave" role="status">Cargando…</p>}>
                    <Outlet />
                </Suspense>
            </main>
            <footer className={CONTENEDOR + ' pb-6 text-[0.8125rem] text-suave'}>
                <p>
                    Despensa Austral es un supermercado ficticio, creado para la asignatura
                    Desarrollo Frontend II (PFY2202) de Duoc UC.
                </p>
            </footer>
            <MenuInferior />
        </>
    );
}

export default Plantilla;
