// Lista de todos los artículos del inventario, leídos del estado global. Los filtros
// viven en la URL (?tipo=lacteos&estado=bajo): se pueden compartir, se mantienen al
// recargar y el botón Atrás del navegador los respeta.
import { useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import FiltrosArticulos from '../componentes/FiltrosArticulos.jsx';
import TablaArticulos from '../componentes/TablaArticulos.jsx';
import BotonRestablecer from '../componentes/BotonRestablecer.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { BOTON_CHICO, ENLACE, INTRODUCCION, TITULO_PAGINA } from '../utilidades/estilos.js';
import { contarUnidades } from '../utilidades/formato.js';
import { ESTADOS, STOCK_MAXIMO, filtrarArticulos } from '../utilidades/inventario.js';

function ListaArticulos() {
    useTituloPagina('Lista de artículos');
    const { articulos, ajustarStock, restablecer, modificado } = useInventario();
    const [parametros, setParametros] = useSearchParams();
    const { state, search } = useLocation();
    const navegar = useNavigate();
    const [mensaje, setMensaje] = useState(''); // Último ajuste, para el lector de pantalla
    const tituloArticulos = useRef(null);

    // Filtros leídos de la URL. Un valor desconocido (?tipo=xyz) se ignora.
    const busqueda = parametros.get('q') ?? '';
    const tipo = valorConocido(parametros.get('tipo'), TIPOS_PRODUCTO);
    const estado = valorConocido(parametros.get('estado'), ESTADOS);
    const hayFiltros = busqueda !== '' || tipo !== '' || estado !== '';

    // Dato derivado: se recalcula solo cuando cambia lo que usa.
    const visibles = useMemo(
        () => filtrarArticulos(articulos, { busqueda, tipo, estado }),
        [articulos, busqueda, tipo, estado],
    );

    // El formulario llega aquí con el id del artículo que acaba de guardar.
    const agregado = articulos.find((articulo) => articulo.id === state?.agregado);

    // Cambia un filtro en la URL. Escribir en el buscador reemplaza la entrada del
    // historial (replace) para no crear una por cada letra; elegir un tipo o un estado
    // sí crea una, así Atrás vuelve al filtro anterior.
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

    // Ajuste rápido desde la tabla (+1 o −1), anunciado al lector de pantalla.
    function ajustar(articulo, cambio) {
        const nuevo = Math.min(STOCK_MAXIMO, Math.max(0, articulo.stock + cambio));
        if (nuevo === articulo.stock) return;
        ajustarStock(articulo.id, cambio);
        setMensaje(articulo.nombre + ': ' + contarUnidades(nuevo) + '.');
    }

    // Al restablecer, el botón desaparece: el foco pasa al título para no perderse.
    function restablecerInventario() {
        restablecer();
        setMensaje('Se restablecieron los datos de ejemplo.');
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
                    <p className={INTRODUCCION}>Todos los artículos del inventario. Elige uno para ver su detalle y registrar entradas o salidas.</p>
                </div>
                <p className="text-sm text-suave" aria-live="polite">{textoConteo}</p>
            </div>

            <div role="status">
                {agregado && (
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-l-2 border-acento bg-blanco px-3 py-2 text-sm">
                        <span>
                            Se agregó «{agregado.nombre}» al inventario.{' '}
                            <Link to={'/articulo/' + agregado.id} className={ENLACE}>Ver detalle</Link>
                        </span>
                        {/* Reemplazar la entrada sin state quita el aviso y el resaltado */}
                        <button type="button" className={BOTON_CHICO} onClick={() => navegar({ search }, { replace: true })}>
                            Cerrar
                        </button>
                    </div>
                )}
            </div>

            <FiltrosArticulos
                busqueda={busqueda}
                tipo={tipo}
                estado={estado}
                hayFiltros={hayFiltros}
                onCambiar={cambiarFiltro}
                onLimpiar={limpiarFiltros}
            />
            <TablaArticulos articulos={visibles} destacado={agregado?.id} onAjustar={ajustar} onLimpiar={limpiarFiltros} />

            <p className="sr-only" aria-live="polite">{mensaje}</p>

            {/* Renderizado condicional: solo aparece si el inventario cambió respecto de los datos de ejemplo */}
            {modificado && <BotonRestablecer onRestablecer={restablecerInventario} />}
        </>
    );
}

// Devuelve el valor si está en la lista ({ id }) y '' si no.
function valorConocido(valor, lista) {
    return lista.some((item) => item.id === valor) ? valor : '';
}

export default ListaArticulos;
