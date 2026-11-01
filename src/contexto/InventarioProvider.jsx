// Proveedor del estado global: guarda la lista de artículos con useReducer y la entrega a
// toda la aplicación por contexto. Envuelve al sitio en main.jsx, así el estado sobrevive
// al cambio de página, y lo guarda en localStorage para conservarlo al recargar.
import { useEffect, useMemo, useReducer } from 'react';
import { InventarioContext } from './InventarioContext.js';
import { inventarioReducer } from './inventarioReducer.js';
import { ARTICULOS_INICIALES } from '../datos/articulos.js';
import { crearArticulo, STOCK_MAXIMO } from '../utilidades/inventario.js';

const CLAVE = 'despensa-austral-articulos';

function InventarioProvider({ children }) {
    // Tercer argumento: el estado inicial se lee de localStorage una sola vez.
    const [articulos, despachar] = useReducer(inventarioReducer, ARTICULOS_INICIALES, leerGuardado);

    // Efecto secundario: cada vez que cambia la lista, se guarda.
    useEffect(() => {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(articulos));
        } catch {
            // Navegación privada o almacenamiento lleno: el sitio sigue funcionando sin guardar.
        }
    }, [articulos]);

    // useMemo evita volver a dibujar a quienes leen el contexto si la lista no cambió.
    const valor = useMemo(() => {
        // Devuelve el artículo creado para que el formulario conozca su id.
        function agregarArticulo(datos) {
            const articulo = crearArticulo(datos, articulos);
            despachar({ type: 'agregar', articulo });
            return articulo;
        }

        function ajustarStock(id, cambio) {
            despachar({ type: 'ajustar-stock', id, cambio });
        }

        function restablecer() {
            despachar({ type: 'restablecer' });
        }

        const modificado = JSON.stringify(articulos) !== JSON.stringify(ARTICULOS_INICIALES);
        return { articulos, modificado, agregarArticulo, ajustarStock, restablecer };
    }, [articulos]);

    return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>;
}

// Lee la lista guardada. Si falta o no tiene la forma esperada (por ejemplo, si alguien
// editó el almacenamiento a mano), parte de los datos de ejemplo.
function leerGuardado(inicial) {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE));
        return Array.isArray(guardado) && guardado.length > 0 && guardado.every(esArticuloValido) ? guardado : inicial;
    } catch {
        return inicial;
    }
}

function esArticuloValido(articulo) {
    return articulo !== null && typeof articulo === 'object'
        && ['id', 'sku', 'nombre', 'marca', 'tipo', 'formato', 'ubicacion'].every((campo) => typeof articulo[campo] === 'string')
        && Number.isInteger(articulo.precio)
        && Number.isInteger(articulo.stockMinimo)
        && Number.isInteger(articulo.stock) && articulo.stock >= 0 && articulo.stock <= STOCK_MAXIMO;
}

export default InventarioProvider;
