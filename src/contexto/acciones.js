// Creadores de acciones: cada función arma el objeto { type, ... } que entiende el reductor.
// El proveedor solo las despacha, y las pruebas pueden usar las mismas funciones.
export const acciones = {
    // Recibe el artículo completo, ya armado con crearArticulo() (utilidades/inventario.js).
    agregarArticulo: (articulo) => ({ type: 'agregar-articulo', articulo }),
    ajustarStock: (id, cambio) => ({ type: 'ajustar-stock', id, cambio }),
    // Cantidad positiva: del inventario al carrito. Negativa: del carrito al inventario.
    moverAlCarrito: (id, cantidad) => ({ type: 'mover-al-carrito', id, cantidad }),
    quitarDelCarrito: (id) => ({ type: 'quitar-del-carrito', id }),
    vaciarCarrito: () => ({ type: 'vaciar-carrito' }),
    finalizarCompra: () => ({ type: 'finalizar-compra' }),
    restablecer: () => ({ type: 'restablecer' }),
};
