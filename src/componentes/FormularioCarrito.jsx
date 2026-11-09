// Agrega unidades de un artículo al carrito desde su detalle. Las unidades salen del
// inventario: el stock baja apenas se agregan y vuelve si se quitan desde el carrito.
// La cantidad elegida es estado local: solo le importa a este formulario.
import { useState } from 'react';
import { Link } from 'react-router';
import Aviso from './Aviso.jsx';
import Boton from './Boton.jsx';
import SelectorCantidad from './SelectorCantidad.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { ENLACE } from '../utilidades/estilos.js';
import { contarUnidades } from '../utilidades/formato.js';

function FormularioCarrito({ articulo }) {
    const { carrito, agregarAlCarrito } = useInventario();
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState('');

    const enCarrito = carrito.find((linea) => linea.id === articulo.id)?.cantidad ?? 0;
    const agotado = articulo.stock === 0;
    // Si el stock bajó después de elegir, la cantidad se ajusta a lo que queda.
    const elegida = Math.max(1, Math.min(cantidad, articulo.stock));

    function agregar(evento) {
        evento.preventDefault();
        if (agotado) return;
        agregarAlCarrito(articulo.id, elegida);
        setMensaje(
            'Agregaste ' + contarUnidades(elegida) + ' al carrito. Quedan '
            + contarUnidades(articulo.stock - elegida) + ' en el inventario.',
        );
        setCantidad(1);
    }

    return (
        <form onSubmit={agregar}>
            <p className="mb-3 text-sm text-suave">
                {enCarrito > 0 ? 'Tienes ' + contarUnidades(enCarrito) + ' en el carrito.' : 'Este artículo no está en el carrito.'}
            </p>

            {agotado ? (
                <p className="mb-3 text-sm text-alerta">Sin stock: no quedan unidades para agregar al carrito.</p>
            ) : (
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">Cantidad</span>
                    <SelectorCantidad
                        cantidad={elegida}
                        nombre={articulo.nombre}
                        puedeRestar={elegida > 1}
                        puedeSumar={elegida < articulo.stock}
                        onRestar={() => setCantidad(elegida - 1)}
                        onSumar={() => setCantidad(elegida + 1)}
                    />
                </div>
            )}

            <Boton type="submit" variante="principal" className="w-full" aria-disabled={agotado}>
                Agregar al carrito
            </Boton>
            <Aviso enPanel className="mt-3">
                {mensaje && <>{mensaje} <Link to="/carrito" className={ENLACE}>Ver carrito</Link></>}
            </Aviso>
        </form>
    );
}

export default FormularioCarrito;
