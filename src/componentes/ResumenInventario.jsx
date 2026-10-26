// Resumen del inventario en cuatro cifras. Las tres primeras también son filtros: al
// pulsarlas, la tabla muestra solo esos productos y la cifra queda marcada
// (aria-pressed). Pulsar de nuevo la cifra marcada vuelve a mostrar todo.
import { contarUnidades, formatearNumero, formatearPesos } from '../utilidades/formato.js';

function ResumenInventario({ resumen, estado, onElegirEstado }) {
    const cifras = [
        { estado: '', titulo: 'Productos', valor: resumen.total, detalle: contarUnidades(resumen.unidades) + ' en total' },
        { estado: 'bajo', titulo: 'Stock bajo', valor: resumen.bajo, detalle: 'En el mínimo o por debajo' },
        { estado: 'agotado', titulo: 'Sin stock', valor: resumen.agotado, detalle: 'Reponer cuanto antes' },
    ];

    return (
        <section className="resumen" aria-label="Resumen del inventario">
            {cifras.map((cifra) => {
                const elegida = estado === cifra.estado;
                return (
                    <button
                        key={cifra.titulo}
                        type="button"
                        className={'cifra cifra-boton' + (cifra.estado === 'agotado' && cifra.valor > 0 ? ' cifra-alerta' : '')}
                        aria-pressed={elegida}
                        onClick={() => onElegirEstado(elegida ? '' : cifra.estado)}
                    >
                        <span className="cifra-titulo">{cifra.titulo}</span>
                        <span className="cifra-valor">{formatearNumero(cifra.valor)}</span>
                        <span className="cifra-detalle">{cifra.detalle}</span>
                    </button>
                );
            })}
            <div className="cifra">
                <span className="cifra-titulo">Valor del inventario</span>
                <span className="cifra-valor">{formatearPesos(resumen.valor)}</span>
                <span className="cifra-detalle">A precio de venta</span>
            </div>
        </section>
    );
}

export default ResumenInventario;
