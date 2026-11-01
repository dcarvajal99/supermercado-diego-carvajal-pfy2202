// Home del sitio: el panel del inventario. Resume el estado global en cuatro cifras y
// muestra los artículos que hay que reponer; la tabla completa está en /articulos.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import EstadoStock from '../componentes/EstadoStock.jsx';
import ResumenInventario from '../componentes/ResumenInventario.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { BOTON_PRINCIPAL, BOTON_SECUNDARIO, ENLACE_SIMPLE, INTRODUCCION, SUBTITULO, TITULO_PAGINA } from '../utilidades/estilos.js';
import { formatearNumero } from '../utilidades/formato.js';
import { listarPorReponer, resumirInventario } from '../utilidades/inventario.js';

function Inicio() {
    useTituloPagina('Inicio');
    const { articulos } = useInventario();

    // Datos derivados: se recalculan solo cuando cambia la lista de artículos.
    const resumen = useMemo(() => resumirInventario(articulos), [articulos]);
    const porReponer = useMemo(() => listarPorReponer(articulos), [articulos]);

    return (
        <>
            <div className="mb-6">
                <h1 className={TITULO_PAGINA}>Inventario de la sucursal</h1>
                <p className={INTRODUCCION}>
                    Estado del stock de Despensa Austral Concepción Centro. Elige una cifra para ver esos artículos.
                </p>
            </div>

            <ResumenInventario resumen={resumen} />

            <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/articulos" className={BOTON_PRINCIPAL}>Ver todos los artículos</Link>
                <Link to="/ingresar-articulo" className={BOTON_SECUNDARIO}>Ingresar artículo</Link>
            </div>

            <section className="mt-8" aria-labelledby="titulo-reponer">
                <h2 id="titulo-reponer" className={SUBTITULO + ' mb-3'}>Por reponer</h2>
                {/* Renderizado condicional: sin artículos por reponer, la lista da paso a un aviso */}
                {porReponer.length === 0 ? (
                    <p className="text-suave">Todos los artículos están sobre su stock mínimo.</p>
                ) : (
                    <ul className="divide-y divide-borde rounded-lg border border-borde bg-blanco">
                        {porReponer.map((articulo) => (
                            <li key={articulo.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3">
                                <div>
                                    <Link to={'/articulo/' + articulo.id} className={ENLACE_SIMPLE + ' font-semibold'}>
                                        {articulo.nombre}
                                    </Link>
                                    <span className="block text-sm text-suave">{articulo.marca} · {articulo.formato}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-suave tabular-nums">
                                        {formatearNumero(articulo.stock)} de {formatearNumero(articulo.stockMinimo)} mínimas
                                    </span>
                                    <EstadoStock articulo={articulo} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
}

export default Inicio;
