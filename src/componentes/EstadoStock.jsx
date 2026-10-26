// Etiqueta con el estado del stock: Disponible, Stock bajo o Sin stock.
// El texto dice el estado; el color solo lo refuerza.
import { estadoStock, nombreEstado } from '../utilidades/inventario.js';

function EstadoStock({ producto }) {
    const estado = estadoStock(producto);
    return <span className={'estado estado-' + estado}>{nombreEstado(estado)}</span>;
}

export default EstadoStock;
