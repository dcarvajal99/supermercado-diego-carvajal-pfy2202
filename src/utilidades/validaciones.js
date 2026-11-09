// Validación del formulario de artículos. Cada campo de texto se revisa con una expresión
// regular que declara qué caracteres y qué largo se aceptan; los números, además, se
// revisan por rango. Devuelve un objeto { campo: mensaje } solo con los campos que tienen
// problemas, en el orden del formulario: vacío significa que todo está bien.
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { formatearNumero, normalizarTexto } from './formato.js';
import { STOCK_MAXIMO, stockValido } from './inventario.js';

const PRECIO_MAXIMO = 999999;

// \p{L} es cualquier letra, incluidas las con tilde y la ñ (necesita la bandera u).
export const PATRONES = {
    // 3 a 60 caracteres. Empieza con letra o número; después letras, números, espacios y . , ' % - / ( ) º
    nombre: /^[\p{L}\d][\p{L}\d .,'%\-/()º]{2,59}$/u,
    // 2 a 40 caracteres. Empieza con letra o número; después letras, números, espacios y . ' & -
    marca: /^[\p{L}\d][\p{L}\d .'&-]{1,39}$/u,
    // Cantidad (hasta 4 cifras y 2 decimales con coma o punto) y unidad: 1 kg, 500 ml, 1,6 L, 12 rollos
    formato: /^\d{1,4}([.,]\d{1,2})?\s?(g|kg|mg|ml|cc|l|un|unidad|unidades|rollo|rollos|sobre|sobres|paquete|paquetes|hoja|hojas)$/iu,
    // Precio en pesos chilenos: solo dígitos. Sin puntos de miles ni decimales, porque el peso no usa centavos.
    precio: /^\d{1,6}$/,
    // Unidades: número entero sin signo ni decimales. El rango lo revisa stockValido().
    entero: /^\d+$/,
};

export function validarArticulo(valores, articulos) {
    const errores = {};

    const nombre = valores.nombre.trim();
    if (nombre === '') errores.nombre = 'Ingresa el nombre del artículo.';
    else if (!PATRONES.nombre.test(nombre)) errores.nombre = "El nombre lleva de 3 a 60 caracteres: letras, números, espacios y . , ' % - / ( ) º";
    else if (esDuplicado(valores, articulos)) errores.nombre = 'Ya existe este artículo con la misma marca y formato.';

    const marca = valores.marca.trim();
    if (marca === '') errores.marca = 'Ingresa la marca.';
    else if (!PATRONES.marca.test(marca)) errores.marca = "La marca lleva de 2 a 40 caracteres: letras, números, espacios y . ' & -";

    if (!TIPOS_PRODUCTO.some((tipo) => tipo.id === valores.tipo)) errores.tipo = 'Elige la categoría del artículo.';

    const formato = valores.formato.trim();
    if (formato === '') errores.formato = 'Ingresa el formato del artículo.';
    else if (!PATRONES.formato.test(formato)) errores.formato = 'Escribe una cantidad y una unidad, por ejemplo 1 kg, 500 ml, 1,6 L o 12 rollos.';

    const precio = valores.precio.trim();
    if (precio === '') errores.precio = 'Ingresa el precio de venta.';
    else if (!PATRONES.precio.test(precio)) errores.precio = 'El precio va en pesos, solo con números: sin puntos ni decimales.';
    else if (Number(precio) < 1 || Number(precio) > PRECIO_MAXIMO) errores.precio = 'El precio debe estar entre $1 y $' + formatearNumero(PRECIO_MAXIMO) + '.';

    const stock = revisarStock(valores.stock, 'El stock inicial');
    if (stock) errores.stock = stock;

    const minimo = revisarStock(valores.stockMinimo, 'El stock mínimo');
    if (minimo) errores.stockMinimo = minimo;

    return errores;
}

// Un artículo se repite si coinciden nombre, marca y formato, sin importar tildes ni mayúsculas.
function esDuplicado({ nombre, marca, formato }, articulos) {
    const clave = (a, b, c) => normalizarTexto(a.trim() + '|' + b.trim() + '|' + c.trim());
    const nueva = clave(nombre, marca, formato);
    return articulos.some((articulo) => clave(articulo.nombre, articulo.marca, articulo.formato) === nueva);
}

// Devuelve el mensaje de error de un campo de stock, o '' si es un entero dentro de los límites.
function revisarStock(texto, etiqueta) {
    const valor = texto.trim();
    if (valor === '') return etiqueta + ' es obligatorio.';
    if (!PATRONES.entero.test(valor)) return etiqueta + ' debe ser un número entero, sin decimales.';
    if (!stockValido(Number(valor))) return etiqueta + ' debe estar entre 0 y ' + formatearNumero(STOCK_MAXIMO) + '.';
    return '';
}
