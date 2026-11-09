// Casos P: persistencia en localStorage (contexto/persistencia.js). Cada prueba usa un
// almacenamiento falso en memoria, así no depende del navegador. Ver pruebas/matriz-de-casos.md.
import { describe, expect, it } from 'vitest';
import { CLAVE, CLAVE_SEMANA_2, borrarEstado, guardarEstado, leerEstadoGuardado } from '../src/contexto/persistencia.js';
import { ESTADO_INICIAL } from '../src/contexto/inventarioReducer.js';

function crearAlmacen(inicial = {}) {
    const datos = new Map(Object.entries(inicial));
    return {
        datos,
        getItem: (clave) => (datos.has(clave) ? datos.get(clave) : null),
        setItem: (clave, valor) => datos.set(clave, String(valor)),
        removeItem: (clave) => datos.delete(clave),
    };
}

const CON_CARRITO = {
    articulos: ESTADO_INICIAL.articulos.map((articulo) => (articulo.id === 'palta-hass' ? { ...articulo, stock: 6 } : articulo)),
    carrito: [{ id: 'palta-hass', cantidad: 3 }],
    modificado: true,
};

describe('Persistencia', () => {
    it('P1 sin nada guardado se parte de los datos de ejemplo', () => {
        expect(leerEstadoGuardado(ESTADO_INICIAL, crearAlmacen())).toBe(ESTADO_INICIAL);
    });

    it('P2 lo guardado se recupera igual', () => {
        const almacen = crearAlmacen();
        guardarEstado(CON_CARRITO, almacen);
        expect(leerEstadoGuardado(ESTADO_INICIAL, almacen)).toEqual(CON_CARRITO);
    });

    it('P3 un JSON roto se descarta', () => {
        expect(leerEstadoGuardado(ESTADO_INICIAL, crearAlmacen({ [CLAVE]: '{roto' }))).toBe(ESTADO_INICIAL);
    });

    it('P4 un carrito con un artículo que no existe se descarta', () => {
        const malo = { ...CON_CARRITO, carrito: [{ id: 'no-existe', cantidad: 2 }] };
        expect(leerEstadoGuardado(ESTADO_INICIAL, crearAlmacen({ [CLAVE]: JSON.stringify(malo) }))).toBe(ESTADO_INICIAL);
    });

    it('P5 un stock fuera de los límites se descarta', () => {
        const malo = { ...CON_CARRITO, articulos: [{ ...CON_CARRITO.articulos[0], stock: -4 }] };
        expect(leerEstadoGuardado(ESTADO_INICIAL, crearAlmacen({ [CLAVE]: JSON.stringify(malo) }))).toBe(ESTADO_INICIAL);
    });

    it('P6 lo guardado por la Semana 2 se aprovecha con el carrito vacío', () => {
        const almacen = crearAlmacen({ [CLAVE_SEMANA_2]: JSON.stringify(CON_CARRITO.articulos) });
        expect(leerEstadoGuardado(ESTADO_INICIAL, almacen)).toEqual({ articulos: CON_CARRITO.articulos, carrito: [], modificado: true });
    });

    it('P7 borrar elimina lo guardado de esta semana y de la Semana 2', () => {
        const almacen = crearAlmacen({ [CLAVE]: '{}', [CLAVE_SEMANA_2]: '[]', otra: 'x' });
        borrarEstado(almacen);
        expect([...almacen.datos.keys()]).toEqual(['otra']);
    });

    it('P8 si el almacenamiento falla, el sitio sigue funcionando', () => {
        const bloqueado = { getItem: () => { throw new Error('bloqueado'); }, setItem: () => { throw new Error('lleno'); }, removeItem: () => { throw new Error('bloqueado'); } };
        expect(() => guardarEstado(CON_CARRITO, bloqueado)).not.toThrow();
        expect(() => borrarEstado(bloqueado)).not.toThrow();
        expect(leerEstadoGuardado(ESTADO_INICIAL, bloqueado)).toBe(ESTADO_INICIAL);
    });
});
