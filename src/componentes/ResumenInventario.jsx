// Resumen del inventario en cuatro cifras. Las tres primeras son enlaces a la lista de
// artículos con el filtro ya aplicado en la URL (/articulos?estado=bajo).
import { Link } from 'react-router';
import { contarUnidades, formatearNumero, formatearPesos } from '../utilidades/formato.js';

const CIFRA = 'flex flex-col gap-0.5 rounded-lg border border-borde bg-blanco px-[1.125rem] py-4';
const TITULO = 'text-[0.8125rem] font-medium text-suave';
const VALOR = 'text-xl font-semibold tabular-nums sm:text-2xl';
const DETALLE = 'text-[0.8125rem] text-suave';

function ResumenInventario({ resumen }) {
    const cifras = [
        { ruta: '/articulos', titulo: 'Artículos', valor: resumen.total, detalle: contarUnidades(resumen.unidades) + ' en total' },
        { ruta: '/articulos?estado=bajo', titulo: 'Stock bajo', valor: resumen.bajo, detalle: 'En el mínimo o por debajo' },
        { ruta: '/articulos?estado=agotado', titulo: 'Sin stock', valor: resumen.agotado, detalle: 'Reponer cuanto antes', alerta: resumen.agotado > 0 },
    ];

    return (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Resumen del inventario">
            {cifras.map((cifra) => (
                <Link key={cifra.titulo} to={cifra.ruta} className={CIFRA + ' text-tinta hover:border-suave'}>
                    <span className={TITULO}>{cifra.titulo}</span>
                    <span className={cifra.alerta ? VALOR + ' text-alerta' : VALOR}>{formatearNumero(cifra.valor)}</span>
                    <span className={DETALLE}>{cifra.detalle}</span>
                </Link>
            ))}
            <div className={CIFRA}>
                <span className={TITULO}>Valor del inventario</span>
                <span className={VALOR}>{formatearPesos(resumen.valor)}</span>
                <span className={DETALLE}>A precio de venta</span>
            </div>
        </section>
    );
}

export default ResumenInventario;
