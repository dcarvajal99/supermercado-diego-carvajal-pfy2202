// Carrito de compras: lista los artículos que la persona agregó desde el detalle. Subir o
// bajar una cantidad mueve unidades entre el carrito y el inventario general, así que el
// stock de la lista, del detalle y del inicio se actualiza al mismo tiempo.
import { useMemo, useRef, useState } from 'react';
import Aviso from '../componentes/Aviso.jsx';
import Boton from '../componentes/Boton.jsx';
import BotonConfirmar from '../componentes/BotonConfirmar.jsx';
import LineaCarrito from '../componentes/LineaCarrito.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { armarLineas, calcularTotal } from '../utilidades/carrito.js';
import { INTRODUCCION, PANEL, TITULO_PAGINA } from '../utilidades/estilos.js';
import { contarUnidades, formatearPesos } from '../utilidades/formato.js';

function Carrito() {
    useTituloPagina('Carrito de compras');
    const { articulos, carrito, unidadesCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito, finalizarCompra } = useInventario();
    const [mensaje, setMensaje] = useState(''); // Último cambio, para el lector de pantalla
    const [compra, setCompra] = useState(null); // Resumen de la última compra finalizada
    const titulo = useRef(null);

    // Datos derivados del estado global: las líneas con sus artículos y el total.
    const lineas = useMemo(() => armarLineas(carrito, articulos), [carrito, articulos]);
    const total = calcularTotal(lineas);

    function cambiar(linea, cambio) {
        cambiarCantidad(linea.id, cambio);
        setMensaje(linea.articulo.nombre + ': ' + contarUnidades(linea.cantidad + cambio) + ' en el carrito.');
    }

    // Quitar, vaciar o finalizar hacen desaparecer el botón pulsado: el foco pasa al título.
    function quitar(linea) {
        quitarDelCarrito(linea.id);
        setMensaje('Se quitó «' + linea.articulo.nombre + '»: ' + contarUnidades(linea.cantidad) + ' volvieron al inventario.');
        titulo.current?.focus();
    }

    function vaciar() {
        vaciarCarrito();
        setMensaje('Se vació el carrito y las unidades volvieron al inventario.');
        titulo.current?.focus();
    }

    function finalizar() {
        setCompra({ unidades: unidadesCarrito, total });
        finalizarCompra();
        titulo.current?.focus();
    }

    return (
        <>
            <div className="mb-6">
                <h1 className={TITULO_PAGINA} ref={titulo} tabIndex={-1}>Carrito de compras</h1>
                <p className={INTRODUCCION}>
                    Mientras están en el carrito, las unidades se descuentan del inventario. Si las quitas, vuelven al stock.
                </p>
            </div>

            <Aviso className="mb-4">
                {compra && 'Compra registrada: ' + contarUnidades(compra.unidades) + ' por ' + formatearPesos(compra.total) + '. Las unidades quedaron descontadas del inventario.'}
            </Aviso>

            {/* Renderizado condicional: carrito vacío o lista de líneas con su resumen */}
            {lineas.length === 0 ? (
                <div className="rounded-lg border border-dashed border-borde bg-blanco px-4 py-8 text-center text-suave">
                    <p className="mb-3">El carrito está vacío. Elige un artículo de la lista para agregarlo.</p>
                    <Boton ruta="/articulos" variante="principal">Ver la lista de artículos</Boton>
                </div>
            ) : (
                <div className="grid items-start gap-4 lg:grid-cols-12">
                    <section className="overflow-hidden rounded-lg border border-borde bg-blanco lg:col-span-8" aria-label="Artículos en el carrito">
                        <ul className="divide-y divide-borde">
                            {lineas.map((linea) => (
                                <LineaCarrito key={linea.id} linea={linea} onCambiar={cambiar} onQuitar={quitar} />
                            ))}
                        </ul>
                    </section>

                    <section className={PANEL + ' lg:col-span-4'} aria-labelledby="titulo-resumen">
                        <h2 id="titulo-resumen" className="mb-3 font-semibold">Resumen</h2>
                        <dl className="mb-4 space-y-1">
                            <div className="flex justify-between gap-4">
                                <dt className="text-suave">Artículos distintos</dt>
                                <dd className="tabular-nums">{lineas.length}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-suave">Unidades</dt>
                                <dd className="tabular-nums">{unidadesCarrito}</dd>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-borde pt-2 text-lg font-semibold">
                                <dt>Total</dt>
                                <dd className="tabular-nums">{formatearPesos(total)}</dd>
                            </div>
                        </dl>
                        <div className="grid gap-2">
                            <BotonConfirmar
                                variante="principal"
                                texto="Finalizar compra"
                                pregunta={'¿Confirmar la compra por ' + formatearPesos(total) + '?'}
                                confirmar="Sí, comprar"
                                onConfirmar={finalizar}
                            />
                            <BotonConfirmar
                                texto="Vaciar carrito"
                                pregunta="¿Devolver todo al inventario?"
                                confirmar="Sí, vaciar"
                                onConfirmar={vaciar}
                            />
                        </div>
                    </section>
                </div>
            )}

            <p className="sr-only" aria-live="polite">{mensaje}</p>
        </>
    );
}

export default Carrito;
