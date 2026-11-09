// Detalle de un artículo: la ruta dinámica /articulo/:id. Se llega desde la lista al hacer
// clic en un artículo. useParams entrega el :id de la URL y con él se busca el artículo en
// el estado global; desde aquí se agrega al carrito. Si el id no existe, la página lo dice
// en vez de quedar en blanco.
import { Link, useLocation, useParams } from 'react-router';
import Boton from '../componentes/Boton.jsx';
import EstadoStock from '../componentes/EstadoStock.jsx';
import FormularioCarrito from '../componentes/FormularioCarrito.jsx';
import FormularioMovimiento from '../componentes/FormularioMovimiento.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { ENLACE_SIMPLE, INTRODUCCION, PANEL, TITULO_PAGINA } from '../utilidades/estilos.js';
import { contarUnidades, formatearPesos } from '../utilidades/formato.js';
import { estadoStock, nombreTipo } from '../utilidades/inventario.js';

function DetalleArticulo() {
    const { id } = useParams();
    const { articulos, ajustarStock } = useInventario();
    const { state } = useLocation();

    const indice = articulos.findIndex((articulo) => articulo.id === id);
    const articulo = articulos[indice];
    useTituloPagina(articulo ? articulo.nombre : 'Artículo no encontrado');

    // Vuelve a la lista con los filtros que tenía al entrar (llegan en el state del Link).
    const volver = { pathname: '/articulos', search: state?.filtros ?? '' };

    if (!articulo) {
        return (
            <>
                <h1 className={TITULO_PAGINA}>Artículo no encontrado</h1>
                <p className="mt-2 mb-4">No existe un artículo con el código «{id}» en el inventario.</p>
                <Boton ruta={volver} variante="principal">Volver a la lista de artículos</Boton>
            </>
        );
    }

    const anterior = articulos[indice - 1];
    const siguiente = articulos[indice + 1];

    const datos = [
        ['Stock mínimo', contarUnidades(articulo.stockMinimo)],
        ['Precio de venta', formatearPesos(articulo.precio)],
        ['Valor en stock', formatearPesos(articulo.precio * articulo.stock)],
        ['Marca', articulo.marca],
        ['Categoría', nombreTipo(articulo.tipo)],
        ['Ubicación', articulo.ubicacion],
    ];

    return (
        <>
            <nav aria-label="Ruta de navegación">
                <ol className="mb-3 flex flex-wrap gap-x-2 text-sm text-suave">
                    <li><Link to={volver} className={ENLACE_SIMPLE}>Artículos</Link></li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link to={{ pathname: '/articulos', search: '?categoria=' + articulo.tipo }} className={ENLACE_SIMPLE}>
                            {nombreTipo(articulo.tipo)}
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page">{articulo.nombre}</li>
                </ol>
            </nav>

            <div className="mb-6 flex flex-wrap items-start justify-between gap-2">
                <div>
                    <h1 className={TITULO_PAGINA}>{articulo.nombre}</h1>
                    <p className={INTRODUCCION}>{articulo.marca} · {articulo.formato} · SKU {articulo.sku}</p>
                </div>
                <EstadoStock articulo={articulo} />
            </div>

            <div className="grid gap-3 lg:grid-cols-12">
                <section className={PANEL + ' lg:col-span-7'} aria-labelledby="titulo-datos">
                    <h2 id="titulo-datos" className="mb-2 font-semibold">Datos del artículo</h2>
                    <dl className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
                        <div>
                            <dt className="text-[0.8125rem] font-medium text-suave">Stock actual</dt>
                            <dd className="text-xl font-semibold tabular-nums">{contarUnidades(articulo.stock)}</dd>
                        </div>
                        {datos.map(([titulo, valor]) => (
                            <div key={titulo}>
                                <dt className="text-[0.8125rem] font-medium text-suave">{titulo}</dt>
                                <dd className="tabular-nums">{valor}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="text-sm text-suave">{textoReposicion(articulo)}</p>
                </section>

                {/* key: la ruta reutiliza esta página al pasar a otro artículo; con una key
                    distinta cada formulario parte de cero */}
                <div className="grid content-start gap-3 lg:col-span-5">
                    <section className={PANEL} aria-labelledby="titulo-carrito">
                        <h2 id="titulo-carrito" className="mb-2 font-semibold">Agregar al carrito</h2>
                        <FormularioCarrito key={articulo.id} articulo={articulo} />
                    </section>

                    <section className={PANEL} aria-labelledby="titulo-movimiento">
                        <h2 id="titulo-movimiento" className="font-semibold">Ajuste de inventario</h2>
                        <p className="mb-3 text-sm text-suave">Para registrar mercadería que llegó (entrada) o mermas (salida).</p>
                        <FormularioMovimiento
                            key={articulo.id}
                            articulo={articulo}
                            onRegistrar={(cambio) => ajustarStock(articulo.id, cambio)}
                        />
                    </section>
                </div>
            </div>

            {/* Navegación entre artículos por la misma ruta dinámica; conserva los filtros de origen */}
            <nav className="mt-6 flex justify-between gap-4 border-t border-borde pt-4" aria-label="Otros artículos">
                {anterior ? (
                    <Link to={'/articulo/' + anterior.id} state={state} rel="prev" className="font-medium text-acento hover:text-tinta">
                        <span className="block text-sm font-normal text-suave">Anterior</span>
                        {anterior.nombre}
                    </Link>
                ) : <span />}
                {siguiente && (
                    <Link to={'/articulo/' + siguiente.id} state={state} rel="next" className="text-right font-medium text-acento hover:text-tinta">
                        <span className="block text-sm font-normal text-suave">Siguiente</span>
                        {siguiente.nombre}
                    </Link>
                )}
            </nav>
        </>
    );
}

// Frase que explica el estado del stock frente al mínimo.
function textoReposicion(articulo) {
    const estado = estadoStock(articulo);
    if (estado === 'agotado') return 'No quedan unidades: hay que reponer este artículo.';
    if (estado === 'bajo') return 'El stock está en el mínimo o por debajo: conviene reponer pronto.';
    return 'Quedan ' + contarUnidades(articulo.stock - articulo.stockMinimo) + ' sobre el mínimo.';
}

export default DetalleArticulo;
