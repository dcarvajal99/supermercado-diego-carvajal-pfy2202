// Funciones reutilizables de formato.
// Están fuera de los componentes para poder usarlas desde cualquiera de ellos.

const FORMATO_NUMERO = new Intl.NumberFormat('es-CL');

// Convierte 1590 en "$1.590".
export function formatearPesos(valor) {
    return '$' + FORMATO_NUMERO.format(valor);
}

// Convierte 1234 en "1.234".
export function formatearNumero(valor) {
    return FORMATO_NUMERO.format(valor);
}

// "1 unidad", "5 unidades".
export function contarUnidades(cantidad) {
    return formatearNumero(cantidad) + (cantidad === 1 ? ' unidad' : ' unidades');
}

// Quita tildes y mayúsculas para que "azucar" encuentre "Azúcar granulada".
export function normalizarTexto(texto) {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
