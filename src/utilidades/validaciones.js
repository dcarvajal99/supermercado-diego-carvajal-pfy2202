// Validación del formulario de artículos. Devuelve un objeto { campo: mensaje } solo con
// los campos que tienen problemas, en el orden del formulario: vacío significa que todo
// está bien.
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { normalizarTexto } from './formato.js';
import { STOCK_MAXIMO } from './inventario.js';

const PRECIO_MAXIMO = 999999;

export function validarArticulo(valores, articulos) {
    const errores = {};

    const nombre = valores.nombre.trim();
    if (nombre.length < 3) errores.nombre = 'Ingresa el nombre del artículo (al menos 3 letras).';
    else if (esDuplicado(valores, articulos)) errores.nombre = 'Ya existe este artículo con la misma marca y formato.';

    if (valores.marca.trim().length < 2) errores.marca = 'Ingresa la marca (al menos 2 letras).';

    if (!TIPOS_PRODUCTO.some((tipo) => tipo.id === valores.tipo)) errores.tipo = 'Elige el tipo de producto.';

    if (valores.formato.trim() === '') errores.formato = 'Ingresa el formato, por ejemplo 1 kg o 500 ml.';

    const precio = revisarEntero(valores.precio, 1, PRECIO_MAXIMO, 'El precio');
    if (precio) errores.precio = precio;

    const stock = revisarEntero(valores.stock, 0, STOCK_MAXIMO, 'El stock inicial');
    if (stock) errores.stock = stock;

    const minimo = revisarEntero(valores.stockMinimo, 0, STOCK_MAXIMO, 'El stock mínimo');
    if (minimo) errores.stockMinimo = minimo;

    return errores;
}

// Un artículo se repite si coinciden nombre, marca y formato, sin importar tildes ni mayúsculas.
function esDuplicado({ nombre, marca, formato }, articulos) {
    const clave = (a, b, c) => normalizarTexto(a.trim() + '|' + b.trim() + '|' + c.trim());
    const nueva = clave(nombre, marca, formato);
    return articulos.some((articulo) => clave(articulo.nombre, articulo.marca, articulo.formato) === nueva);
}

// Devuelve el mensaje de error, o '' si el texto es un entero dentro del rango.
function revisarEntero(texto, minimo, maximo, etiqueta) {
    if (texto.trim() === '') return etiqueta + ' es obligatorio.';
    const numero = Number(texto);
    if (!Number.isInteger(numero) || numero < minimo || numero > maximo) {
        return etiqueta + ' debe ser un número entero entre ' + minimo + ' y ' + maximo + '.';
    }
    return '';
}
