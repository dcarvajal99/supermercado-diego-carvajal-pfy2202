// Reductor del estado global: recibe la lista de artículos y una acción, y devuelve la
// lista nueva. Es una función pura: no modifica el arreglo anterior ni toca localStorage,
// y todas las formas de cambiar el inventario quedan reunidas en este archivo.
import { ARTICULOS_INICIALES } from '../datos/articulos.js';
import { STOCK_MAXIMO } from '../utilidades/inventario.js';

export function inventarioReducer(articulos, accion) {
    switch (accion.type) {
        // Los artículos nuevos van primero, para verlos al llegar a la lista.
        case 'agregar':
            return [accion.articulo, ...articulos];

        // Suma (entrada) o resta (salida) unidades. Nunca baja de 0 ni pasa del máximo.
        case 'ajustar-stock':
            return articulos.map((articulo) => {
                if (articulo.id !== accion.id) return articulo;
                const stock = Math.min(STOCK_MAXIMO, Math.max(0, articulo.stock + accion.cambio));
                return { ...articulo, stock };
            });

        case 'restablecer':
            return ARTICULOS_INICIALES;

        default:
            throw new Error('Acción desconocida: ' + accion.type);
    }
}
