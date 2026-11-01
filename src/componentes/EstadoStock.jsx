// Etiqueta con el estado del stock: Disponible, Stock bajo o Sin stock.
// El texto dice el estado; el color solo lo refuerza.
import { estadoStock, nombreEstado } from '../utilidades/inventario.js';

const COLORES = {
    disponible: 'border-acento text-acento',
    bajo: 'border-alerta text-alerta',
    agotado: 'border-transparent bg-alerta text-blanco',
};

function EstadoStock({ articulo }) {
    const estado = estadoStock(articulo);
    return (
        <span className={'inline-block rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap ' + COLORES[estado]}>
            {nombreEstado(estado)}
        </span>
    );
}

export default EstadoStock;
