// Plantilla común a todas las páginas: cabecera, contenido, pie y menú inferior.
// <Outlet /> es el hueco donde React Router dibuja la página de la ruta actual.
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Cabecera from './Cabecera.jsx';
import MenuInferior from './MenuInferior.jsx';
import { CONTENEDOR } from '../utilidades/estilos.js';

function Plantilla() {
    const { pathname } = useLocation();
    const contenido = useRef(null);
    const rutaAnterior = useRef(pathname);

    // Al cambiar de página: volver arriba y llevar el foco al contenido, para que el
    // teclado y el lector de pantalla partan desde la página nueva y no desde el menú.
    // No corre al abrir el sitio ni cuando solo cambian los filtros (?tipo=...).
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
                <Outlet />
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
