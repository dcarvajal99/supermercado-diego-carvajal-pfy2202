// Funciones del inventario: estado de cada producto, resumen y filtros.
// No guardan estado; reciben los productos y devuelven un resultado nuevo.
import { CATEGORIAS } from '../datos/productos.js';
import { normalizarTexto } from './formato.js';

// Los tres estados posibles del stock, con el texto que ve la persona.
export const ESTADOS = [
    { id: 'disponible', nombre: 'Disponible' },
    { id: 'bajo', nombre: 'Stock bajo' },
    { id: 'agotado', nombre: 'Sin stock' },
];

// Sin unidades: agotado. En el mínimo o por debajo: hay que reponer.
export function estadoStock(producto) {
    if (producto.stock === 0) return 'agotado';
    if (producto.stock <= producto.stockMinimo) return 'bajo';
    return 'disponible';
}

export function nombreEstado(id) {
    return ESTADOS.find((estado) => estado.id === id)?.nombre ?? '';
}

export function nombreCategoria(id) {
    return CATEGORIAS.find((categoria) => categoria.id === id)?.nombre ?? '';
}

// Cifras del resumen: productos por estado, unidades y valor del stock a precio de venta.
export function resumirInventario(productos) {
    return productos.reduce(
        (resumen, producto) => {
            resumen[estadoStock(producto)] += 1;
            resumen.unidades += producto.stock;
            resumen.valor += producto.stock * producto.precio;
            return resumen;
        },
        { total: productos.length, disponible: 0, bajo: 0, agotado: 0, unidades: 0, valor: 0 },
    );
}

// Aplica los tres filtros del home. Un filtro vacío ('') no descarta nada.
// La búsqueda compara sin tildes ni mayúsculas, por nombre o por SKU.
export function filtrarProductos(productos, { busqueda, categoria, estado }) {
    const texto = normalizarTexto(busqueda.trim());
    return productos.filter((producto) =>
        (categoria === '' || producto.categoria === categoria)
        && (estado === '' || estadoStock(producto) === estado)
        && (texto === '' || normalizarTexto(producto.nombre + ' ' + producto.sku).includes(texto)));
}
