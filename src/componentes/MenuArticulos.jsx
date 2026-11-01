// Menú de artículos, en la cabecera: lleva a las dos páginas que trabajan con el
// inventario. NavLink marca la página abierta con aria-current="page" y useMatch mantiene
// marcada la lista mientras se ve el detalle de un artículo.
import { NavLink, useMatch } from 'react-router-dom';

const ENLACES = [
    { ruta: '/articulos', texto: 'Lista de artículos' },
    { ruta: '/ingresar-articulo', texto: 'Ingresar artículo' },
];

function MenuArticulos() {
    const enDetalle = useMatch('/articulo/:id') !== null;

    function claseEnlace(activo) {
        const base = 'block rounded-md px-3 py-2 text-sm font-medium';
        return activo ? base + ' bg-lienzo font-semibold text-acento' : base + ' text-suave hover:text-tinta';
    }

    return (
        <nav aria-label="Menú de artículos">
            <ul className="flex flex-wrap gap-1">
                {ENLACES.map(({ ruta, texto }) => (
                    <li key={ruta}>
                        <NavLink
                            to={ruta}
                            className={({ isActive }) => claseEnlace(isActive || (ruta === '/articulos' && enDetalle))}
                        >
                            {texto}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MenuArticulos;
