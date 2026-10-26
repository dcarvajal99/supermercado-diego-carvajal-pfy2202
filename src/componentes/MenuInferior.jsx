// Menú inferior: la navegación principal del sitio, fija al pie de la pantalla.
// NavLink es el Link de React Router que sabe si su ruta está activa: le agrega la
// clase «activo» y aria-current="page", y navega sin recargar la página.
import { NavLink, useMatch } from 'react-router-dom';

const ENLACES = [
    { ruta: '/', texto: 'Inventario', Icono: IconoInventario },
    { ruta: '/quienes-somos', texto: 'Quiénes somos', Icono: IconoQuienesSomos },
    { ruta: '/nuestras-tiendas', texto: 'Nuestras tiendas', Icono: IconoTiendas },
];

function MenuInferior() {
    // El detalle de un producto es parte del inventario: ese botón sigue marcado.
    const enDetalle = useMatch('/producto/:id') !== null;

    return (
        <nav className="menu-inferior" aria-label="Menú principal">
            <ul>
                {ENLACES.map(({ ruta, texto, Icono }) => (
                    <li key={ruta}>
                        <NavLink
                            to={ruta}
                            // end: «/» solo está activo en el home, no en todas las rutas que empiezan con «/»
                            end={ruta === '/'}
                            className={({ isActive }) => (isActive || (ruta === '/' && enDetalle) ? 'activo' : undefined)}
                        >
                            <Icono />
                            <span>{texto}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// Íconos de trazo simple; el color lo toma del texto del enlace (currentColor).
function IconoInventario() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
            <path d="M3 7.5 12 12l9-4.5M12 12v9" />
        </svg>
    );
}

function IconoQuienesSomos() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5" />
            <path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.5 3.5 5.2" />
        </svg>
    );
}

function IconoTiendas() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </svg>
    );
}

export default MenuInferior;
