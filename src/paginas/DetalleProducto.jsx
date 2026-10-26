// Detalle de un producto: la ruta dinámica /producto/:id.
// useParams entrega el :id de la URL y con él se busca el producto en el inventario.
// Si el id no existe, la página lo dice en vez de quedar en blanco.
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom';
import EstadoStock from '../componentes/EstadoStock.jsx';
import FormularioMovimiento from '../componentes/FormularioMovimiento.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { estadoStock, nombreCategoria } from '../utilidades/inventario.js';
import { contarUnidades, formatearPesos } from '../utilidades/formato.js';

function DetalleProducto() {
    const { id } = useParams();
    const { productos, ajustarStock } = useOutletContext();
    const { state } = useLocation();

    const indice = productos.findIndex((producto) => producto.id === id);
    const producto = productos[indice];
    useTituloPagina(producto ? producto.nombre : 'Producto no encontrado');

    // Vuelve al inventario con los filtros que tenía al entrar (llegan en el state del Link).
    const volver = { pathname: '/', search: state?.filtros ?? '' };

    if (!producto) {
        return (
            <div className="encabezado-pagina">
                <h1>Producto no encontrado</h1>
                <p>No existe un producto con el código «{id}» en el inventario.</p>
                <Link to={volver} className="btn btn-dark">Volver al inventario</Link>
            </div>
        );
    }

    const anterior = productos[indice - 1];
    const siguiente = productos[indice + 1];

    return (
        <>
            <nav aria-label="Ruta de navegación">
                <ol className="breadcrumb small mb-3">
                    <li className="breadcrumb-item"><Link to={volver}>Inventario</Link></li>
                    <li className="breadcrumb-item">
                        <Link to={{ pathname: '/', search: '?categoria=' + producto.categoria }}>
                            {nombreCategoria(producto.categoria)}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
                </ol>
            </nav>

            <div className="encabezado-pagina d-flex flex-wrap align-items-start justify-content-between gap-2">
                <div>
                    <h1>{producto.nombre}</h1>
                    <p className="text-secondary mb-0">{producto.formato} · SKU {producto.sku}</p>
                </div>
                <EstadoStock producto={producto} />
            </div>

            <div className="row g-3">
                <section className="col-lg-7" aria-labelledby="titulo-datos">
                    <div className="panel h-100">
                        <h2 id="titulo-datos" className="h6">Datos del producto</h2>
                        <dl className="datos">
                            <div>
                                <dt>Stock actual</dt>
                                <dd className="dato-destacado">{contarUnidades(producto.stock)}</dd>
                            </div>
                            <div>
                                <dt>Stock mínimo</dt>
                                <dd>{contarUnidades(producto.stockMinimo)}</dd>
                            </div>
                            <div>
                                <dt>Precio de venta</dt>
                                <dd>{formatearPesos(producto.precio)}</dd>
                            </div>
                            <div>
                                <dt>Valor en stock</dt>
                                <dd>{formatearPesos(producto.precio * producto.stock)}</dd>
                            </div>
                            <div>
                                <dt>Categoría</dt>
                                <dd>{nombreCategoria(producto.categoria)}</dd>
                            </div>
                            <div>
                                <dt>Ubicación</dt>
                                <dd>{producto.ubicacion}</dd>
                            </div>
                        </dl>
                        <p className="small text-secondary mb-0">{textoReposicion(producto)}</p>
                    </div>
                </section>

                <section className="col-lg-5" aria-labelledby="titulo-movimiento">
                    <div className="panel h-100">
                        <h2 id="titulo-movimiento" className="h6">Registrar movimiento</h2>
                        {/* key: la ruta reutiliza esta página al pasar a otro producto;
                            con una key distinta el formulario parte de cero */}
                        <FormularioMovimiento
                            key={producto.id}
                            producto={producto}
                            onRegistrar={(cambio) => ajustarStock(producto.id, cambio)}
                        />
                    </div>
                </section>
            </div>

            {/* Navegación entre productos por la misma ruta dinámica; conserva los filtros de origen */}
            <nav className="otros-productos" aria-label="Otros productos">
                {anterior ? (
                    <Link to={'/producto/' + anterior.id} state={state} rel="prev">
                        <span className="small text-secondary d-block">Anterior</span>
                        {anterior.nombre}
                    </Link>
                ) : <span />}
                {siguiente && (
                    <Link to={'/producto/' + siguiente.id} state={state} rel="next" className="text-end">
                        <span className="small text-secondary d-block">Siguiente</span>
                        {siguiente.nombre}
                    </Link>
                )}
            </nav>
        </>
    );
}

// Frase que explica el estado del stock frente al mínimo.
function textoReposicion(producto) {
    const estado = estadoStock(producto);
    if (estado === 'agotado') return 'No quedan unidades: hay que reponer este producto.';
    if (estado === 'bajo') return 'El stock está en el mínimo o por debajo: conviene reponer pronto.';
    return 'Quedan ' + contarUnidades(producto.stock - producto.stockMinimo) + ' sobre el mínimo.';
}

export default DetalleProducto;
