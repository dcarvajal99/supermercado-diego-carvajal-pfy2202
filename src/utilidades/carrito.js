// Funciones del carrito: arman las líneas que se muestran y calculan los totales.
// El carrito guarda solo { id, cantidad }; el resto de los datos sale del inventario.

// Une cada línea del carrito con su artículo. Si el artículo ya no existe, la línea se descarta.
export function armarLineas(carrito, articulos) {
    return carrito.flatMap((linea) => {
        const articulo = articulos.find((item) => item.id === linea.id);
        if (!articulo) return [];
        return { ...linea, articulo, subtotal: articulo.precio * linea.cantidad };
    });
}

export function contarUnidadesCarrito(carrito) {
    return carrito.reduce((suma, linea) => suma + linea.cantidad, 0);
}

export function calcularTotal(lineas) {
    return lineas.reduce((suma, linea) => suma + linea.subtotal, 0);
}

// Cantidad de cada artículo en el carrito: { 'palta-hass': 2 }. Lo usa la tabla.
export function cantidadesEnCarrito(carrito) {
    return Object.fromEntries(carrito.map((linea) => [linea.id, linea.cantidad]));
}
