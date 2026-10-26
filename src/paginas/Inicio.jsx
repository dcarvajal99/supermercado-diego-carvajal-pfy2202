// Home del sitio: el inventario del supermercado, con un resumen, los filtros y la
// tabla de productos. Los filtros viven en la URL (?categoria=lacteos&estado=bajo):
// se pueden compartir, se mantienen al recargar y el botón Atrás del navegador los respeta.
import { useMemo, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import ResumenInventario from '../componentes/ResumenInventario.jsx';
import FiltrosInventario from '../componentes/FiltrosInventario.jsx';
import TablaInventario from '../componentes/TablaInventario.jsx';
import BotonRestablecer from '../componentes/BotonRestablecer.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { STOCK_MAXIMO } from '../hooks/useInventario.js';
import { CATEGORIAS } from '../datos/productos.js';
import { ESTADOS, filtrarProductos, resumirInventario } from '../utilidades/inventario.js';
import { contarUnidades } from '../utilidades/formato.js';

function Inicio() {
    useTituloPagina('Inventario');
    // El inventario llega desde la Plantilla, a través del <Outlet context>.
    const { productos, ajustarStock, restablecer, modificado } = useOutletContext();
    const [parametros, setParametros] = useSearchParams();
    const [mensaje, setMensaje] = useState(''); // Último ajuste, para el lector de pantalla
    const tituloProductos = useRef(null);

    // Filtros leídos de la URL. Un valor desconocido (?categoria=xyz) se ignora.
    const busqueda = parametros.get('q') ?? '';
    const categoria = valorConocido(parametros.get('categoria'), CATEGORIAS);
    const estado = valorConocido(parametros.get('estado'), ESTADOS);
    const hayFiltros = busqueda !== '' || categoria !== '' || estado !== '';

    // Datos derivados: se recalculan solo cuando cambia lo que usan.
    const resumen = useMemo(() => resumirInventario(productos), [productos]);
    const visibles = useMemo(
        () => filtrarProductos(productos, { busqueda, categoria, estado }),
        [productos, busqueda, categoria, estado],
    );

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

    // Ajuste rápido desde la tabla (+1 o −1), anunciado al lector de pantalla.
    function ajustar(producto, cambio) {
        const nuevo = Math.min(STOCK_MAXIMO, Math.max(0, producto.stock + cambio));
        if (nuevo === producto.stock) return;
        ajustarStock(producto.id, cambio);
        setMensaje(producto.nombre + ': ' + contarUnidades(nuevo) + '.');
    }

    // Al restablecer, el botón desaparece: el foco pasa al título de la tabla para no perderse.
    function restablecerStock() {
        restablecer();
        setMensaje('Se restableció el stock de los datos de ejemplo.');
        tituloProductos.current?.focus();
    }

    const textoConteo = visibles.length === productos.length
        ? productos.length + ' productos'
        : visibles.length + ' de ' + productos.length + ' productos';

    return (
        <>
            <div className="encabezado-pagina">
                <h1>Inventario</h1>
                <p className="text-secondary mb-0">
                    Stock de la sucursal Concepción Centro. Elige un producto para ver su detalle y
                    registrar entradas o salidas.
                </p>
            </div>

            <ResumenInventario
                resumen={resumen}
                estado={estado}
                onElegirEstado={(valor) => cambiarFiltro('estado', valor)}
            />

            <section className="mt-4" aria-labelledby="titulo-productos">
                <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-3">
                    <h2 id="titulo-productos" className="h5 mb-0" ref={tituloProductos} tabIndex={-1}>Productos</h2>
                    <p className="small text-secondary mb-0" aria-live="polite">{textoConteo}</p>
                </div>
                <FiltrosInventario
                    busqueda={busqueda}
                    categoria={categoria}
                    estado={estado}
                    hayFiltros={hayFiltros}
                    onCambiar={cambiarFiltro}
                    onLimpiar={limpiarFiltros}
                />
                <TablaInventario productos={visibles} onAjustar={ajustar} onLimpiar={limpiarFiltros} />
            </section>

            <p className="visually-hidden" aria-live="polite">{mensaje}</p>

            {/* Renderizado condicional: solo aparece si el stock cambió respecto de los datos de ejemplo */}
            {modificado && <BotonRestablecer onRestablecer={restablecerStock} />}
        </>
    );
}

// Devuelve el valor si está en la lista ({ id }) y '' si no.
function valorConocido(valor, lista) {
    return lista.some((item) => item.id === valor) ? valor : '';
}

export default Inicio;
