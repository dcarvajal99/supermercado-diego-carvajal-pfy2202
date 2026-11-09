// Menú de artículos, en la cabecera: la lista, el ingreso de artículos y el carrito, que
// muestra cuántas unidades tiene. NavLink marca la página abierta con aria-current="page"
// y useMatch mantiene marcada la lista mientras se ve el detalle de un artículo.
import { NavLink, useMatch } from 'react-router';
import { useInventario } from '../contexto/InventarioContext.js';

const ENLACES = [
    { ruta: '/articulos', texto: 'Artículos' },
    { ruta: '/ingresar-articulo', texto: 'Ingresar artículo' },
    { ruta: '/carrito', texto: 'Carrito' },
];

function MenuArticulos() {
    const { unidadesCarrito } = useInventario();
    const enDetalle = useMatch('/articulo/:id') !== null;

    function claseEnlace(activo) {
        const base = 'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium';
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
                            {/* El carrito muestra sus unidades; el texto oculto completa la frase para el lector de pantalla */}
                            {ruta === '/carrito' && unidadesCarrito > 0 && (
                                <span className="rounded-full bg-tinta px-1.5 text-xs leading-5 font-semibold text-blanco tabular-nums">
                                    {unidadesCarrito}<span className="sr-only"> {unidadesCarrito === 1 ? 'unidad' : 'unidades'}</span>
                                </span>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MenuArticulos;
