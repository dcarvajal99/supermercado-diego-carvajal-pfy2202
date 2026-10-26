// Tabla del inventario. El nombre de cada producto es un Link a su ruta dinámica
// (/producto/:id) y lleva en `state` los filtros actuales, para que «Volver al
// inventario» regrese a la misma vista. En pantallas chicas cada fila se apila (CSS).
import { Link, useLocation } from 'react-router-dom';
import EstadoStock from './EstadoStock.jsx';
import { STOCK_MAXIMO } from '../hooks/useInventario.js';
import { nombreCategoria } from '../utilidades/inventario.js';
import { formatearNumero, formatearPesos } from '../utilidades/formato.js';

function TablaInventario({ productos, onAjustar, onLimpiar }) {
    const { search } = useLocation();

    if (productos.length === 0) {
        return (
            <div className="vacio">
                <p className="mb-2">No hay productos que coincidan con los filtros.</p>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={onLimpiar}>
                    Ver todos los productos
                </button>
            </div>
        );
    }

    return (
        <div className="tabla-contenedor">
            <table className="table tabla-inventario mb-0">
                <caption className="visually-hidden">Productos del inventario con su stock</caption>
                <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Categoría</th>
                        <th scope="col" className="text-end">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col" className="text-end">Mínimo</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <th scope="row" className="celda-producto">
                                <Link to={'/producto/' + producto.id} state={{ filtros: search }}>
                                    {producto.nombre}
                                </Link>
                                <span className="d-block small text-secondary fw-normal">
                                    {producto.formato} · {producto.sku}
                                </span>
                            </th>
                            <td data-etiqueta="Categoría">{nombreCategoria(producto.categoria)}</td>
                            <td data-etiqueta="Precio" className="celda-numero">{formatearPesos(producto.precio)}</td>
                            <td data-etiqueta="Stock">
                                <AjusteRapido producto={producto} onAjustar={onAjustar} />
                            </td>
                            <td data-etiqueta="Mínimo" className="celda-numero">{formatearNumero(producto.stockMinimo)}</td>
                            <td data-etiqueta="Estado"><EstadoStock producto={producto} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Botones − y + para corregir el stock de a una unidad sin salir del home.
// En el límite quedan con aria-disabled en vez de disabled: así el foco no se pierde.
function AjusteRapido({ producto, onAjustar }) {
    const enCero = producto.stock === 0;
    const enMaximo = producto.stock >= STOCK_MAXIMO;

    return (
        <div className="ajuste">
            <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                aria-label={'Restar una unidad de ' + producto.nombre}
                aria-disabled={enCero}
                onClick={() => onAjustar(producto, -1)}
            >
                −
            </button>
            <span className="ajuste-cifra">{formatearNumero(producto.stock)}</span>
            <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                aria-label={'Sumar una unidad de ' + producto.nombre}
                aria-disabled={enMaximo}
                onClick={() => onAjustar(producto, 1)}
            >
                +
            </button>
        </div>
    );
}

export default TablaInventario;
