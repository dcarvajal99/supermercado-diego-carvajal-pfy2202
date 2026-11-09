// Lista de todos los artículos del inventario, leídos del estado global.
//
// Filtro por categoría: la categoría elegida, el estado y la búsqueda viven en la URL
// (?categoria=lacteos&estado=bajo), que es el estado de esta pantalla. Al cambiar, React
// vuelve a dibujar y filtrarArticulos() calcula una lista NUEVA a partir de la completa;
// los artículos del estado global nunca se modifican ni se pierden. La URL además se puede
// compartir, se mantiene al recargar y el botón Atrás la respeta.
import { useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import Aviso from '../componentes/Aviso.jsx';
import BotonConfirmar from '../componentes/BotonConfirmar.jsx';
import FiltrosArticulos from '../componentes/FiltrosArticulos.jsx';
import TablaArticulos from '../componentes/TablaArticulos.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { cantidadesEnCarrito } from '../utilidades/carrito.js';
import { ENLACE, INTRODUCCION, TITULO_PAGINA } from '../utilidades/estilos.js';
import { ESTADOS, contarPorCategoria, filtrarArticulos } from '../utilidades/inventario.js';

function ListaArticulos() {
    useTituloPagina('Lista de artículos');
    const { articulos, carrito, restablecer, modificado } = useInventario();
    const [parametros, setParametros] = useSearchParams();
    const { state, search } = useLocation();
    const navegar = useNavigate();
    const tituloArticulos = useRef(null);

    // Filtros leídos de la URL. Un valor desconocido (?categoria=xyz) se ignora.
    const busqueda = parametros.get('q') ?? '';
    const categoria = valorConocido(parametros.get('categoria'), TIPOS_PRODUCTO);
    const estado = valorConocido(parametros.get('estado'), ESTADOS);
    const hayFiltros = busqueda !== '' || categoria !== '' || estado !== '';

    // Datos derivados: se recalculan solo cuando cambia lo que usan.
    const visibles = useMemo(
        () => filtrarArticulos(articulos, { busqueda, categoria, estado }),
        [articulos, busqueda, categoria, estado],
    );
    const totales = useMemo(() => ({ todas: articulos.length, ...contarPorCategoria(articulos) }), [articulos]);
    const enCarrito = useMemo(() => cantidadesEnCarrito(carrito), [carrito]);

    // El formulario de ingreso llega aquí con el id del artículo que acaba de guardar.
    const agregado = articulos.find((articulo) => articulo.id === state?.agregado);

    // Cambia un filtro en la URL. Escribir en el buscador reemplaza la entrada del
    // historial (replace) para no crear una por cada letra; elegir una categoría o un
    // estado sí crea una, así Atrás vuelve al filtro anterior.
    function cambiarFiltro(nombre, valor, { reemplazar = false } = {}) {
        setParametros((actuales) => {
            const nuevos = new URLSearchParams(actuales);
            if (valor === '') nuevos.delete(nombre);
            else nuevos.set(nombre, valor);
            return nuevos;
        }, { replace: reemplazar });
    }

    function limpiarFiltros() {
        setParametros({});
    }

    // Al restablecer, el botón desaparece: el foco pasa al título para no perderse.
    function restablecerInventario() {
        restablecer();
        tituloArticulos.current?.focus();
    }

    const textoConteo = visibles.length === articulos.length
        ? articulos.length + ' artículos'
        : visibles.length + ' de ' + articulos.length + ' artículos';

    return (
        <>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                    <h1 className={TITULO_PAGINA} ref={tituloArticulos} tabIndex={-1}>Lista de artículos</h1>
                    <p className={INTRODUCCION}>Todos los artículos del inventario. Elige uno para ver su detalle y agregarlo al carrito.</p>
                </div>
                <p className="text-sm text-suave" aria-live="polite">{textoConteo}</p>
            </div>

            {/* Reemplazar la entrada sin state quita el aviso y el resaltado */}
            <Aviso className="mb-4" onCerrar={agregado ? () => navegar({ search }, { replace: true }) : undefined}>
                {agregado && (
                    <>
                        Se agregó «{agregado.nombre}» al inventario.{' '}
                        <Link to={'/articulo/' + agregado.id} className={ENLACE}>Ver detalle</Link>
                    </>
                )}
            </Aviso>

            <FiltrosArticulos
                busqueda={busqueda}
                categoria={categoria}
                estado={estado}
                totales={totales}
                hayFiltros={hayFiltros}
                onCambiar={cambiarFiltro}
                onLimpiar={limpiarFiltros}
            />
            <TablaArticulos articulos={visibles} enCarrito={enCarrito} destacado={agregado?.id} onLimpiar={limpiarFiltros} />

            {/* Renderizado condicional: solo aparece si el inventario cambió respecto de los datos de ejemplo */}
            {modificado && (
                <div className="mt-6 border-t border-borde pt-4">
                    <p className="mb-2 text-sm text-suave">
                        Los artículos ingresados, el carrito y los ajustes de stock se guardan en este navegador.
                    </p>
                    <BotonConfirmar
                        texto="Restablecer datos de ejemplo"
                        pregunta="¿Volver a los datos de ejemplo y vaciar el carrito?"
                        confirmar="Sí, restablecer"
                        onConfirmar={restablecerInventario}
                    />
                </div>
            )}
        </>
    );
}

// Devuelve el valor si está en la lista ({ id }) y '' si no.
function valorConocido(valor, lista) {
    return lista.some((item) => item.id === valor) ? valor : '';
}

export default ListaArticulos;
