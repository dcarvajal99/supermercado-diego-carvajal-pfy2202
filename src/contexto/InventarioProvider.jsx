// Proveedor del estado global: une las piezas y entrega el resultado por contexto.
//   - inventarioReducer.js: las transiciones del estado (funciones puras).
//   - acciones.js: los objetos de acción que se despachan.
//   - persistencia.js y hooks/usePersistencia.js: lectura y guardado en localStorage.
// Envuelve al sitio en App.jsx, así el estado sobrevive al cambio de página.
import { useMemo, useReducer } from 'react';
import { acciones } from './acciones.js';
import { InventarioContext } from './InventarioContext.js';
import { ESTADO_INICIAL, inventarioReducer } from './inventarioReducer.js';
import { leerEstadoGuardado } from './persistencia.js';
import { usePersistencia } from '../hooks/usePersistencia.js';
import { contarUnidadesCarrito } from '../utilidades/carrito.js';

function InventarioProvider({ children }) {
    // Tercer argumento: el estado inicial se lee de localStorage una sola vez.
    const [estado, despachar] = useReducer(inventarioReducer, ESTADO_INICIAL, leerEstadoGuardado);
    usePersistencia(estado);

    // Las funciones que despachan acciones no cambian nunca: se crean una sola vez.
    const operaciones = useMemo(() => ({
        agregarArticulo: (articulo) => despachar(acciones.agregarArticulo(articulo)),
        ajustarStock: (id, cambio) => despachar(acciones.ajustarStock(id, cambio)),
        agregarAlCarrito: (id, cantidad) => despachar(acciones.moverAlCarrito(id, cantidad)),
        cambiarCantidad: (id, cambio) => despachar(acciones.moverAlCarrito(id, cambio)),
        quitarDelCarrito: (id) => despachar(acciones.quitarDelCarrito(id)),
        vaciarCarrito: () => despachar(acciones.vaciarCarrito()),
        finalizarCompra: () => despachar(acciones.finalizarCompra()),
        restablecer: () => despachar(acciones.restablecer()),
    }), []);

    // useMemo evita volver a dibujar a quienes leen el contexto si el estado no cambió.
    const valor = useMemo(() => ({
        articulos: estado.articulos,
        carrito: estado.carrito,
        modificado: estado.modificado,
        unidadesCarrito: contarUnidadesCarrito(estado.carrito),
        ...operaciones,
    }), [estado, operaciones]);

    return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>;
}

export default InventarioProvider;
