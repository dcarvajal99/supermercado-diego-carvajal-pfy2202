// Reductor del estado global: recibe el estado ({ articulos, carrito, modificado }) y una
// acción, y devuelve el estado nuevo. Es una función pura: no modifica el estado anterior,
// no toca localStorage y no crea datos por su cuenta; todas las formas de cambiar el
// inventario quedan reunidas aquí. Los objetos de acción los arma acciones.js.
//
// El inventario y el carrito comparten un solo estado porque dependen uno del otro: cada
// unidad que entra al carrito sale del stock, y vuelve si se quita. Al cambiar ambos en
// la misma acción, nunca quedan desfasados.
import { ARTICULOS_INICIALES } from '../datos/articulos.js';
import { cambioPermitido, recortarStock } from '../utilidades/inventario.js';

// modificado: bandera explícita que indica si el estado se apartó de los datos de ejemplo.
export const ESTADO_INICIAL = { articulos: ARTICULOS_INICIALES, carrito: [], modificado: false };

export function inventarioReducer(estado, accion) {
    if (accion.type === 'restablecer') return ESTADO_INICIAL;

    // Si la acción cambió algo, el estado queda marcado como modificado. Una acción que no
    // se puede aplicar (por ejemplo, agregar al carrito sin stock) devuelve el mismo estado.
    const siguiente = aplicar(estado, accion);
    return siguiente === estado ? estado : { ...siguiente, modificado: true };
}

function aplicar(estado, accion) {
    switch (accion.type) {
        // Los artículos nuevos van primero, para verlos al llegar a la lista.
        case 'agregar-articulo':
            return { ...estado, articulos: [accion.articulo, ...estado.articulos] };

        // Entrada (cambio positivo) o salida (negativo) registrada en el detalle.
        case 'ajustar-stock': {
            const articulos = cambiarStock(estado.articulos, accion.id, accion.cambio);
            return articulos === estado.articulos ? estado : { ...estado, articulos };
        }

        // Agregar desde el detalle o sumar desde el carrito: las unidades salen del stock.
        // Restar desde el carrito: cantidad negativa, las unidades vuelven al stock.
        case 'mover-al-carrito':
            return moverAlCarrito(estado, accion.id, accion.cantidad);

        case 'quitar-del-carrito': {
            const linea = estado.carrito.find((item) => item.id === accion.id);
            return linea ? moverAlCarrito(estado, accion.id, -linea.cantidad) : estado;
        }

        // Todas las unidades del carrito vuelven al inventario.
        case 'vaciar-carrito':
            return estado.carrito.reduce((actual, linea) => moverAlCarrito(actual, linea.id, -linea.cantidad), estado);

        // La compra se cierra: el carrito se vacía y las unidades quedan descontadas.
        case 'finalizar-compra':
            return estado.carrito.length === 0 ? estado : { ...estado, carrito: [] };

        default:
            throw new Error('Acción desconocida: ' + accion.type);
    }
}

// Mueve unidades entre el inventario y el carrito (cantidad positiva: del inventario al
// carrito). Si el stock no permite el cambio, o el carrito no tiene esas unidades, el
// estado queda igual.
function moverAlCarrito(estado, id, cantidad) {
    const articulo = estado.articulos.find((item) => item.id === id);
    const enCarrito = estado.carrito.find((linea) => linea.id === id)?.cantidad ?? 0;
    const nueva = enCarrito + cantidad;
    if (!articulo || cantidad === 0 || nueva < 0 || !cambioPermitido(articulo.stock, -cantidad)) return estado;

    let carrito;
    if (nueva === 0) carrito = estado.carrito.filter((linea) => linea.id !== id);
    else if (enCarrito === 0) carrito = [...estado.carrito, { id, cantidad: nueva }];
    else carrito = estado.carrito.map((linea) => (linea.id === id ? { ...linea, cantidad: nueva } : linea));

    return { ...estado, articulos: cambiarStock(estado.articulos, id, -cantidad), carrito };
}

// Devuelve una lista nueva con el stock del artículo cambiado, recortado a los límites.
// Si el stock queda igual, devuelve la misma lista: así no se marca un cambio que no hubo.
function cambiarStock(articulos, id, cambio) {
    const articulo = articulos.find((item) => item.id === id);
    if (!articulo || recortarStock(articulo.stock + cambio) === articulo.stock) return articulos;
    return articulos.map((item) => (item.id === id ? { ...item, stock: recortarStock(item.stock + cambio) } : item));
}
