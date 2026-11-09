// Una línea del carrito: el artículo, su precio, el selector de cantidad, lo que queda en
// el inventario y el subtotal. Cada cambio de cantidad mueve una unidad entre el carrito y
// el inventario. «−» se detiene en 1: para sacar el artículo está «Quitar».
import { Link } from 'react-router';
import Boton from './Boton.jsx';
import SelectorCantidad from './SelectorCantidad.jsx';
import { ENLACE_SIMPLE } from '../utilidades/estilos.js';
import { contarUnidades, formatearPesos } from '../utilidades/formato.js';

function LineaCarrito({ linea, onCambiar, onQuitar }) {
    const { articulo, cantidad, subtotal } = linea;

    return (
        <li className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_auto_8rem] sm:items-center sm:gap-6">
            <div>
                <Link to={'/articulo/' + articulo.id} className={ENLACE_SIMPLE + ' font-semibold'}>
                    {articulo.nombre}
                </Link>
                <span className="block text-sm text-suave">
                    {articulo.marca} · {articulo.formato} · {formatearPesos(articulo.precio)} c/u
                </span>
                <span className={'block text-sm ' + (articulo.stock === 0 ? 'text-alerta' : 'text-suave')}>
                    {articulo.stock === 0 ? 'No quedan más unidades en el inventario' : 'Quedan ' + contarUnidades(articulo.stock) + ' en el inventario'}
                </span>
            </div>
            <SelectorCantidad
                cantidad={cantidad}
                nombre={articulo.nombre}
                puedeRestar={cantidad > 1}
                puedeSumar={articulo.stock > 0}
                onRestar={() => onCambiar(linea, -1)}
                onSumar={() => onCambiar(linea, 1)}
            />
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
                <span className="font-semibold tabular-nums">{formatearPesos(subtotal)}</span>
                <Boton tamano="chico" aria-label={'Quitar ' + articulo.nombre + ' del carrito'} onClick={() => onQuitar(linea)}>
                    Quitar
                </Boton>
            </div>
        </li>
    );
}

export default LineaCarrito;
