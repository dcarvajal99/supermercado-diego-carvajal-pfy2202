// Persistencia del estado en localStorage: leer, guardar y borrar, con la revisión de lo
// guardado. No usa React, así que se puede probar por separado: cada función recibe el
// almacenamiento como parámetro (por defecto, localStorage del navegador).
import { stockValido } from '../utilidades/inventario.js';

export const CLAVE = 'despensa-austral-inventario';
export const CLAVE_SEMANA_2 = 'despensa-austral-articulos'; // Solo artículos, sin carrito

// Lee el estado guardado. Si no hay, aprovecha la lista de artículos que guardaba la
// Semana 2. Si lo guardado no tiene la forma esperada (por ejemplo, si alguien editó el
// almacenamiento a mano), devuelve el estado inicial.
export function leerEstadoGuardado(inicial, almacen = globalThis.localStorage) {
    try {
        const guardado = JSON.parse(almacen.getItem(CLAVE));
        if (esEstadoValido(guardado)) return { ...guardado, modificado: true };
        const articulos = JSON.parse(almacen.getItem(CLAVE_SEMANA_2));
        if (esListaValida(articulos)) return { articulos, carrito: [], modificado: true };
    } catch {
        // Datos ilegibles o almacenamiento bloqueado: se usan los datos de ejemplo.
    }
    return inicial;
}

export function guardarEstado(estado, almacen = globalThis.localStorage) {
    try {
        almacen.setItem(CLAVE, JSON.stringify(estado));
    } catch {
        // Navegación privada o almacenamiento lleno: el sitio sigue funcionando sin guardar.
    }
}

// Sin cambios no hay nada que guardar: se borra lo guardado (también lo de la Semana 2,
// para que no reaparezca al recargar) y la próxima visita parte de los datos de ejemplo.
export function borrarEstado(almacen = globalThis.localStorage) {
    try {
        almacen.removeItem(CLAVE);
        almacen.removeItem(CLAVE_SEMANA_2);
    } catch {
        // Almacenamiento bloqueado: no hay nada que borrar.
    }
}

export function esEstadoValido(estado) {
    return estado !== null && typeof estado === 'object'
        && esListaValida(estado.articulos)
        && Array.isArray(estado.carrito)
        && estado.carrito.every((linea) => Number.isInteger(linea?.cantidad) && linea.cantidad >= 1
            && estado.articulos.some((articulo) => articulo.id === linea.id));
}

function esListaValida(articulos) {
    return Array.isArray(articulos) && articulos.length > 0 && articulos.every(esArticuloValido);
}

function esArticuloValido(articulo) {
    return articulo !== null && typeof articulo === 'object'
        && ['id', 'sku', 'nombre', 'marca', 'tipo', 'formato', 'ubicacion'].every((campo) => typeof articulo[campo] === 'string')
        && Number.isInteger(articulo.precio)
        && stockValido(articulo.stockMinimo)
        && stockValido(articulo.stock);
}
