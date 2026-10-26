// Hook propio del inventario. Parte de los productos de datos/productos.js y guarda en
// localStorage solo el stock que cambió ({ id: unidades }); el resto de los datos sigue
// en el código. Así los ajustes se conservan al recargar o al volver otro día.
import { useMemo } from 'react';
import { PRODUCTOS } from '../datos/productos.js';
import { useEstadoGuardado } from './useEstadoGuardado.js';

const CLAVE = 'despensa-austral-stock';
export const STOCK_MAXIMO = 9999;

export function useInventario() {
    const [stockGuardado, setStockGuardado] = useEstadoGuardado(CLAVE, {}, limpiarGuardado);

    // Cada producto con su stock vigente: el guardado si existe, si no el inicial.
    const productos = useMemo(
        () => PRODUCTOS.map((producto) => ({ ...producto, stock: stockGuardado[producto.id] ?? producto.stock })),
        [stockGuardado],
    );

    // Suma (entrada) o resta (salida) unidades. Nunca baja de 0 ni pasa del máximo.
    // Crea un objeto nuevo en vez de modificar el anterior, para que React vuelva a dibujar.
    function ajustarStock(id, cambio) {
        setStockGuardado((actual) => {
            const producto = PRODUCTOS.find((item) => item.id === id);
            if (!producto) return actual;
            const anterior = actual[id] ?? producto.stock;
            const nuevo = Math.min(STOCK_MAXIMO, Math.max(0, anterior + cambio));
            return { ...actual, [id]: nuevo };
        });
    }

    // Vuelve al stock de los datos de ejemplo.
    function restablecer() {
        setStockGuardado({});
    }

    const modificado = Object.keys(stockGuardado).length > 0;

    return { productos, ajustarStock, restablecer, modificado };
}

// Descarta lo guardado que no tenga la forma esperada: solo quedan ids conocidos con
// un número entero de unidades dentro del rango.
function limpiarGuardado(guardado) {
    if (guardado === null || typeof guardado !== 'object' || Array.isArray(guardado)) return null;
    const limpio = {};
    for (const producto of PRODUCTOS) {
        const valor = guardado[producto.id];
        if (Number.isInteger(valor) && valor >= 0 && valor <= STOCK_MAXIMO) limpio[producto.id] = valor;
    }
    return limpio;
}
