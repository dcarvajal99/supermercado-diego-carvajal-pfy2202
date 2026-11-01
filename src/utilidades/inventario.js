// Funciones del inventario: estado de cada artículo, resumen, filtros y creación.
// No guardan estado; reciben los artículos y devuelven un resultado nuevo.
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { normalizarTexto } from './formato.js';

export const STOCK_MAXIMO = 9999;

// Los tres estados posibles del stock, con el texto que ve la persona.
export const ESTADOS = [
    { id: 'disponible', nombre: 'Disponible' },
    { id: 'bajo', nombre: 'Stock bajo' },
    { id: 'agotado', nombre: 'Sin stock' },
];

// Sin unidades: agotado. En el mínimo o por debajo: hay que reponer.
export function estadoStock(articulo) {
    if (articulo.stock === 0) return 'agotado';
    if (articulo.stock <= articulo.stockMinimo) return 'bajo';
    return 'disponible';
}

export function nombreEstado(id) {
    return ESTADOS.find((estado) => estado.id === id)?.nombre ?? '';
}

export function nombreTipo(id) {
    return TIPOS_PRODUCTO.find((tipo) => tipo.id === id)?.nombre ?? '';
}

// Cifras del resumen: artículos por estado, unidades y valor del stock a precio de venta.
export function resumirInventario(articulos) {
    return articulos.reduce(
        (resumen, articulo) => {
            resumen[estadoStock(articulo)] += 1;
            resumen.unidades += articulo.stock;
            resumen.valor += articulo.stock * articulo.precio;
            return resumen;
        },
        { total: articulos.length, disponible: 0, bajo: 0, agotado: 0, unidades: 0, valor: 0 },
    );
}

// Artículos que hay que reponer: primero los agotados y luego los más lejos de su mínimo.
export function listarPorReponer(articulos) {
    return articulos
        .filter((articulo) => estadoStock(articulo) !== 'disponible')
        .sort((a, b) => a.stock / (a.stockMinimo || 1) - b.stock / (b.stockMinimo || 1));
}

// Aplica los tres filtros de la lista. Un filtro vacío ('') no descarta nada.
// La búsqueda compara sin tildes ni mayúsculas, por nombre, marca o SKU.
export function filtrarArticulos(articulos, { busqueda, tipo, estado }) {
    const texto = normalizarTexto(busqueda.trim());
    return articulos.filter((articulo) =>
        (tipo === '' || articulo.tipo === tipo)
        && (estado === '' || estadoStock(articulo) === estado)
        && (texto === '' || normalizarTexto(articulo.nombre + ' ' + articulo.marca + ' ' + articulo.sku).includes(texto)));
}

// Arma un artículo completo a partir de los campos del formulario (que llegan como texto).
export function crearArticulo(datos, articulos) {
    return {
        id: generarId(datos, articulos),
        sku: siguienteSku(datos.tipo, articulos),
        nombre: datos.nombre.trim(),
        marca: datos.marca.trim(),
        tipo: datos.tipo,
        formato: datos.formato.trim(),
        precio: Number(datos.precio),
        stock: Number(datos.stock),
        stockMinimo: Number(datos.stockMinimo),
        ubicacion: datos.ubicacion.trim() || 'Por asignar',
    };
}

// "Café molido", "Lago Azul", "250 g" → cafe-molido-lago-azul-250-g
function generarId({ nombre, marca, formato }, articulos) {
    const base = normalizarTexto(nombre + ' ' + marca + ' ' + formato).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let id = base;
    for (let numero = 2; articulos.some((articulo) => articulo.id === id); numero += 1) {
        id = base + '-' + numero;
    }
    return id;
}

// El siguiente número libre del tipo: si el último es LAC-003, devuelve LAC-004.
function siguienteSku(tipo, articulos) {
    const prefijo = TIPOS_PRODUCTO.find((item) => item.id === tipo).prefijo;
    const usados = articulos
        .filter((articulo) => articulo.sku.startsWith(prefijo + '-'))
        .map((articulo) => Number(articulo.sku.split('-')[1]));
    return prefijo + '-' + String(Math.max(0, ...usados) + 1).padStart(3, '0');
}
