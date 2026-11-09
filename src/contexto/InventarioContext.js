// Contexto del inventario: el canal por el que cualquier componente llega al estado
// global sin recibirlo por props. El estado lo crea InventarioProvider.jsx.
import { createContext, useContext } from 'react';

export const InventarioContext = createContext(null);

// Hook para leer el estado global: const { articulos, carrito, agregarAlCarrito } = useInventario();
export function useInventario() {
    const contexto = useContext(InventarioContext);
    if (contexto === null) {
        throw new Error('useInventario debe usarse dentro de <InventarioProvider>.');
    }
    return contexto;
}
