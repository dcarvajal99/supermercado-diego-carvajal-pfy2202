// Casos V: validación del formulario de artículos (utilidades/validaciones.js).
// Ver pruebas/matriz-de-casos.md.
import { describe, expect, it } from 'vitest';
import { ARTICULOS_INICIALES } from '../src/datos/articulos.js';
import { PATRONES, validarArticulo } from '../src/utilidades/validaciones.js';

const VALIDO = {
    nombre: 'Café molido', marca: 'Lago Azul', tipo: 'abarrotes', formato: '250 g',
    precio: '4590', stock: '4', stockMinimo: '6', ubicacion: '',
};

// Valida un artículo que solo cambia los campos indicados respecto de VALIDO.
const validarCon = (cambios) => validarArticulo({ ...VALIDO, ...cambios }, ARTICULOS_INICIALES);

describe('Validación del formulario de artículos', () => {
    it('V1 los artículos de ejemplo cumplen los patrones de nombre, marca y formato', () => {
        for (const articulo of ARTICULOS_INICIALES) {
            expect(PATRONES.nombre.test(articulo.nombre), articulo.nombre).toBe(true);
            expect(PATRONES.marca.test(articulo.marca), articulo.marca).toBe(true);
            expect(PATRONES.formato.test(articulo.formato), articulo.formato).toBe(true);
        }
    });

    it('V2 un artículo completo y correcto no tiene errores', () => {
        expect(validarCon({})).toEqual({});
    });

    it('V3 el formulario vacío marca los siete campos obligatorios, en orden', () => {
        const vacio = Object.fromEntries(Object.keys(VALIDO).map((campo) => [campo, '']));
        expect(Object.keys(validarArticulo(vacio, ARTICULOS_INICIALES)))
            .toEqual(['nombre', 'marca', 'tipo', 'formato', 'precio', 'stock', 'stockMinimo']);
    });

    it('V4 el nombre acepta letras con tilde y rechaza símbolos o largos fuera de rango', () => {
        expect(validarCon({ nombre: 'Ñoquis de papa' })).toEqual({});
        expect(validarCon({ nombre: '<script>' })).toHaveProperty('nombre');
        expect(validarCon({ nombre: 'Té' })).toHaveProperty('nombre');
        expect(validarCon({ nombre: 'a'.repeat(61) })).toHaveProperty('nombre');
    });

    it('V5 la marca acepta letras, números y & y rechaza una sola letra', () => {
        expect(validarCon({ marca: 'Casa & Co' })).toEqual({});
        expect(validarCon({ marca: 'A' })).toHaveProperty('marca');
        expect(validarCon({ marca: 'Marca#1' })).toHaveProperty('marca');
    });

    it('V6 el formato exige cantidad y unidad', () => {
        for (const formato of ['1 kg', '500 ml', '1,6 L', '12 rollos', '250g', '2 unidades']) {
            expect(validarCon({ formato }), formato).toEqual({});
        }
        for (const formato of ['un kilo', 'kg 1', '1 kilos', '1,234 L']) {
            expect(validarCon({ formato }), formato).toHaveProperty('formato');
        }
    });

    it('V7 el precio va en pesos enteros: sin puntos, decimales ni notación científica', () => {
        for (const precio of ['45.90', '4.590', '1e3', '-5', '1000000']) {
            expect(validarCon({ precio }), precio).toHaveProperty('precio');
        }
        expect(validarCon({ precio: '0' }).precio).toMatch(/entre \$1/);
    });

    it('V8 el stock se revisa con la regla común: entero y dentro de los límites', () => {
        expect(validarCon({ stock: '2.5' }).stock).toMatch(/sin decimales/);
        expect(validarCon({ stock: '10000' }).stock).toMatch(/entre 0 y 9\.999/);
        expect(validarCon({ stockMinimo: '-1' })).toHaveProperty('stockMinimo');
    });

    it('V9 detecta un artículo repetido sin importar tildes ni mayúsculas', () => {
        const repetido = validarCon({ nombre: 'leche ENTERA', marca: 'la pradera', formato: '1 l', tipo: 'lacteos' });
        expect(repetido.nombre).toMatch(/Ya existe/);
    });
});
