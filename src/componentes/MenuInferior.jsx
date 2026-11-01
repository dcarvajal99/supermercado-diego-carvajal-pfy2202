// Menú inferior: la navegación general del sitio, fija al pie de la pantalla.
// NavLink es el Link de React Router que sabe si su ruta está activa: le agrega
// aria-current="page", recibe isActive para elegir las clases y navega sin recargar.
import { NavLink } from 'react-router-dom';

const ENLACES = [
    { ruta: '/', texto: 'Inicio', Icono: IconoInicio },
    { ruta: '/quienes-somos', texto: 'Quiénes somos', Icono: IconoQuienesSomos },
    { ruta: '/nuestras-tiendas', texto: 'Nuestras tiendas', Icono: IconoTiendas },
];

function MenuInferior() {
    function claseEnlace({ isActive }) {
        const base = '-mt-px flex min-h-[4.25rem] flex-col items-center justify-center gap-1 border-t-2 px-1 py-2 text-center text-[0.8125rem] focus-visible:-outline-offset-4';
        return isActive
            ? base + ' border-acento font-semibold text-acento'
            : base + ' border-transparent font-medium text-suave hover:text-tinta';
    }

    return (
        <nav
            className="fixed inset-x-0 bottom-0 z-30 border-t border-borde bg-blanco pb-[env(safe-area-inset-bottom)]"
            aria-label="Menú principal"
        >
            <ul className="mx-auto grid max-w-xl grid-cols-3">
                {ENLACES.map(({ ruta, texto, Icono }) => (
                    <li key={ruta}>
                        {/* end: «/» solo está activo en el inicio, no en todas las rutas que empiezan con «/» */}
                        <NavLink to={ruta} end={ruta === '/'} className={claseEnlace}>
                            <Icono />
                            <span>{texto}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// Atributos comunes de los íconos: trazo simple del color del texto del enlace.
const TRAZO = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

function IconoInicio() {
    return (
        <svg {...TRAZO}>
            <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
            <path d="M3 7.5 12 12l9-4.5M12 12v9" />
        </svg>
    );
}

function IconoQuienesSomos() {
    return (
        <svg {...TRAZO}>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5" />
            <path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.5 3.5 5.2" />
        </svg>
    );
}

function IconoTiendas() {
    return (
        <svg {...TRAZO}>
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </svg>
    );
}

export default MenuInferior;
