// Tabla de todos los artículos del inventario. El nombre de cada uno es un Link a su ruta
// dinámica (/articulo/:id) y lleva en `state` los filtros actuales, para que «Artículos»
// regrese a la misma vista. En pantallas chicas cada fila se apila en bloques: las clases
// max-md: cambian la tabla a grilla y muestran la etiqueta de cada dato (data-etiqueta).
import { Link, useLocation } from 'react-router-dom';
import EstadoStock from './EstadoStock.jsx';
import { STOCK_MAXIMO, nombreTipo } from '../utilidades/inventario.js';
import { BOTON_CHICO, BOTON_ICONO, ENLACE_SIMPLE } from '../utilidades/estilos.js';
import { formatearNumero, formatearPesos } from '../utilidades/formato.js';

const ENCABEZADO = 'bg-lienzo px-4 py-3 text-[0.8125rem] font-medium text-suave';
const CELDA = 'px-4 py-3 align-middle max-md:block max-md:p-0 max-md:before:block max-md:before:text-xs max-md:before:text-suave max-md:before:content-[attr(data-etiqueta)]';
const NUMERO = CELDA + ' text-right tabular-nums max-md:text-left';

function TablaArticulos({ articulos, destacado, onAjustar, onLimpiar }) {
    const { search } = useLocation();

    if (articulos.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-borde bg-blanco px-4 py-8 text-center text-suave">
                <p className="mb-2">No hay artículos que coincidan con los filtros.</p>
                <button type="button" className={BOTON_CHICO} onClick={onLimpiar}>
                    Ver todos los artículos
                </button>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-borde bg-blanco">
            <table className="w-full border-collapse text-[0.9375rem] max-md:block">
                <caption className="sr-only">Artículos del inventario con su marca, tipo de producto y stock</caption>
                <thead className="border-b border-borde max-md:sr-only">
                    <tr>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Artículo</th>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Marca</th>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Tipo de producto</th>
                        <th scope="col" className={ENCABEZADO + ' text-right'}>Precio</th>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Stock</th>
                        <th scope="col" className={ENCABEZADO + ' text-right'}>Mínimo</th>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Estado</th>
                    </tr>
                </thead>
                <tbody className="max-md:block">
                    {articulos.map((articulo) => (
                        <tr
                            key={articulo.id}
                            className={'border-b border-borde last:border-b-0 max-md:grid max-md:grid-cols-2 max-md:gap-x-4 max-md:gap-y-2 max-md:p-4' + (articulo.id === destacado ? ' bg-lienzo' : '')}
                        >
                            <th scope="row" className="px-4 py-3 text-left font-normal max-md:col-span-2 max-md:p-0">
                                <Link to={'/articulo/' + articulo.id} state={{ filtros: search }} className={ENLACE_SIMPLE + ' font-semibold'}>
                                    {articulo.nombre}
                                </Link>
                                {articulo.id === destacado && <span className="ml-2 text-xs font-medium text-acento">Nuevo</span>}
                                <span className="block text-sm text-suave">{articulo.formato} · {articulo.sku}</span>
                            </th>
                            <td data-etiqueta="Marca" className={CELDA}>{articulo.marca}</td>
                            <td data-etiqueta="Tipo de producto" className={CELDA}>{nombreTipo(articulo.tipo)}</td>
                            <td data-etiqueta="Precio" className={NUMERO}>{formatearPesos(articulo.precio)}</td>
                            <td data-etiqueta="Stock" className={CELDA}>
                                <AjusteRapido articulo={articulo} onAjustar={onAjustar} />
                            </td>
                            <td data-etiqueta="Mínimo" className={NUMERO}>{formatearNumero(articulo.stockMinimo)}</td>
                            <td data-etiqueta="Estado" className={CELDA}><EstadoStock articulo={articulo} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Botones − y + para corregir el stock de a una unidad sin salir de la lista.
// En el límite quedan con aria-disabled en vez de disabled: así el foco no se pierde.
function AjusteRapido({ articulo, onAjustar }) {
    return (
        <div className="inline-flex items-center gap-1.5">
            <button
                type="button"
                className={BOTON_ICONO}
                aria-label={'Restar una unidad de ' + articulo.nombre}
                aria-disabled={articulo.stock === 0}
                onClick={() => onAjustar(articulo, -1)}
            >
                −
            </button>
            <span className="min-w-10 text-center font-semibold tabular-nums">{formatearNumero(articulo.stock)}</span>
            <button
                type="button"
                className={BOTON_ICONO}
                aria-label={'Sumar una unidad de ' + articulo.nombre}
                aria-disabled={articulo.stock >= STOCK_MAXIMO}
                onClick={() => onAjustar(articulo, 1)}
            >
                +
            </button>
        </div>
    );
}

export default TablaArticulos;
