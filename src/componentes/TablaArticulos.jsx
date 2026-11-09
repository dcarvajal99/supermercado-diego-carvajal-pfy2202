// Tabla de los artículos del inventario. El nombre de cada uno es un Link a su ruta
// dinámica (/articulo/:id), donde se ve el detalle y se agrega al carrito; el enlace lleva
// en `state` los filtros actuales, para que «Artículos» regrese a la misma vista.
// En pantallas chicas cada fila se apila en bloques: las clases max-md: cambian la tabla
// a grilla y muestran la etiqueta de cada dato (data-etiqueta).
import { Link, useLocation } from 'react-router';
import Boton from './Boton.jsx';
import EstadoStock from './EstadoStock.jsx';
import { nombreTipo } from '../utilidades/inventario.js';
import { ENLACE_SIMPLE } from '../utilidades/estilos.js';
import { contarUnidades, formatearNumero, formatearPesos } from '../utilidades/formato.js';

const ENCABEZADO = 'bg-lienzo px-4 py-3 text-[0.8125rem] font-medium text-suave';
const CELDA = 'px-4 py-3 align-middle max-md:block max-md:p-0 max-md:before:block max-md:before:text-xs max-md:before:text-suave max-md:before:content-[attr(data-etiqueta)]';
const NUMERO = CELDA + ' text-right tabular-nums max-md:text-left';

function TablaArticulos({ articulos, enCarrito, destacado, onLimpiar }) {
    const { search } = useLocation();

    if (articulos.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-borde bg-blanco px-4 py-8 text-center text-suave">
                <p className="mb-2">No hay artículos que coincidan con los filtros.</p>
                <Boton tamano="chico" onClick={onLimpiar}>Ver todos los artículos</Boton>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-borde bg-blanco">
            <table className="w-full border-collapse text-[0.9375rem] max-md:block">
                <caption className="sr-only">Artículos del inventario con su marca, categoría, precio y stock</caption>
                <thead className="border-b border-borde max-md:sr-only">
                    <tr>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Artículo</th>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Marca</th>
                        <th scope="col" className={ENCABEZADO + ' text-left'}>Categoría</th>
                        <th scope="col" className={ENCABEZADO + ' text-right'}>Precio</th>
                        <th scope="col" className={ENCABEZADO + ' text-right'}>Stock</th>
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
                                <span className="block text-sm text-suave">
                                    {articulo.formato} · {articulo.sku}
                                    {/* Renderizado condicional: solo si el artículo está en el carrito */}
                                    {enCarrito[articulo.id] && <> · <span className="text-acento">{contarUnidades(enCarrito[articulo.id])} en el carrito</span></>}
                                </span>
                            </th>
                            <td data-etiqueta="Marca" className={CELDA}>{articulo.marca}</td>
                            <td data-etiqueta="Categoría" className={CELDA}>{nombreTipo(articulo.tipo)}</td>
                            <td data-etiqueta="Precio" className={NUMERO}>{formatearPesos(articulo.precio)}</td>
                            <td data-etiqueta="Stock" className={NUMERO + ' font-semibold'}>{formatearNumero(articulo.stock)}</td>
                            <td data-etiqueta="Mínimo" className={NUMERO}>{formatearNumero(articulo.stockMinimo)}</td>
                            <td data-etiqueta="Estado" className={CELDA}><EstadoStock articulo={articulo} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaArticulos;
