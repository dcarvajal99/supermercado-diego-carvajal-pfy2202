// Casos S (stock), C (carrito) y B (bandera de cambios) del reductor del estado global.
// Ver pruebas/matriz-de-casos.md. Las acciones se arman con los mismos creadores que usa
// el proveedor (contexto/acciones.js).
import { describe, expect, it } from 'vitest';
import { acciones } from '../src/contexto/acciones.js';
import { ESTADO_INICIAL, inventarioReducer } from '../src/contexto/inventarioReducer.js';
import { STOCK_MAXIMO, crearArticulo } from '../src/utilidades/inventario.js';

// Aplica una serie de acciones partiendo del estado inicial.
const aplicar = (...lista) => lista.reduce(inventarioReducer, ESTADO_INICIAL);
const stockDe = (estado, id) => estado.articulos.find((articulo) => articulo.id === id).stock;
const enCarrito = (estado, id) => estado.carrito.find((linea) => linea.id === id)?.cantidad ?? 0;

// palta-hass parte con 9 unidades; azucar-granulada, con 0.
const PALTA = 'palta-hass';

describe('Stock', () => {
    it('S1 una entrada suma unidades y una salida las resta', () => {
        expect(stockDe(aplicar(acciones.ajustarStock(PALTA, 5)), PALTA)).toBe(14);
        expect(stockDe(aplicar(acciones.ajustarStock(PALTA, -4)), PALTA)).toBe(5);
    });

    it('S2 el stock nunca baja de 0 ni pasa del máximo', () => {
        expect(stockDe(aplicar(acciones.ajustarStock(PALTA, -50)), PALTA)).toBe(0);
        expect(stockDe(aplicar(acciones.ajustarStock(PALTA, 20000)), PALTA)).toBe(STOCK_MAXIMO);
    });

    it('S3 agregar un artículo lo deja primero en la lista', () => {
        const datos = { nombre: 'Café molido', marca: 'Lago Azul', tipo: 'abarrotes', formato: '250 g', precio: '4590', stock: '4', stockMinimo: '6', ubicacion: '' };
        const articulo = crearArticulo(datos, ESTADO_INICIAL.articulos);
        const estado = aplicar(acciones.agregarArticulo(articulo));
        expect(estado.articulos[0]).toEqual(articulo);
        expect(articulo.sku).toBe('ABA-005');
        expect(estado.articulos).toHaveLength(ESTADO_INICIAL.articulos.length + 1);
    });
});

describe('Carrito', () => {
    it('C1 agregar al carrito descuenta las unidades del inventario', () => {
        const estado = aplicar(acciones.moverAlCarrito(PALTA, 3));
        expect(stockDe(estado, PALTA)).toBe(6);
        expect(enCarrito(estado, PALTA)).toBe(3);
    });

    it('C2 no se puede agregar más que el stock: el estado queda igual', () => {
        const antes = aplicar(acciones.moverAlCarrito(PALTA, 3));
        expect(inventarioReducer(antes, acciones.moverAlCarrito(PALTA, 7))).toBe(antes);
        expect(inventarioReducer(antes, acciones.moverAlCarrito('azucar-granulada', 1))).toBe(antes);
    });

    it('C3 restar en el carrito devuelve la unidad al inventario', () => {
        const estado = aplicar(acciones.moverAlCarrito(PALTA, 3), acciones.moverAlCarrito(PALTA, -1));
        expect(stockDe(estado, PALTA)).toBe(7);
        expect(enCarrito(estado, PALTA)).toBe(2);
    });

    it('C4 quitar devuelve todas las unidades y elimina la línea', () => {
        const estado = aplicar(acciones.moverAlCarrito(PALTA, 3), acciones.quitarDelCarrito(PALTA));
        expect(stockDe(estado, PALTA)).toBe(9);
        expect(estado.carrito).toEqual([]);
    });

    it('C5 vaciar devuelve todo al inventario', () => {
        const estado = aplicar(
            acciones.moverAlCarrito(PALTA, 3),
            acciones.moverAlCarrito('leche-entera', 2),
            acciones.vaciarCarrito(),
        );
        expect(estado.articulos).toEqual(ESTADO_INICIAL.articulos);
        expect(estado.carrito).toEqual([]);
    });

    it('C6 finalizar la compra vacía el carrito y las unidades quedan descontadas', () => {
        const estado = aplicar(acciones.moverAlCarrito(PALTA, 3), acciones.finalizarCompra());
        expect(estado.carrito).toEqual([]);
        expect(stockDe(estado, PALTA)).toBe(6);
    });

    it('C7 en cualquier secuencia, stock + carrito se conserva', () => {
        const estado = aplicar(
            acciones.moverAlCarrito(PALTA, 4),
            acciones.moverAlCarrito(PALTA, 2),
            acciones.moverAlCarrito(PALTA, -3),
            acciones.moverAlCarrito(PALTA, 10), // No hay stock suficiente: se ignora
        );
        expect(stockDe(estado, PALTA) + enCarrito(estado, PALTA)).toBe(9);
    });
});

describe('Bandera de cambios', () => {
    it('B1 el estado inicial no está modificado', () => {
        expect(ESTADO_INICIAL.modificado).toBe(false);
    });

    it('B2 un cambio real marca el estado como modificado', () => {
        expect(aplicar(acciones.moverAlCarrito(PALTA, 1)).modificado).toBe(true);
    });

    it('B3 una acción que no cambia nada no marca el estado', () => {
        expect(aplicar(acciones.ajustarStock('azucar-granulada', -1))).toBe(ESTADO_INICIAL);
        expect(aplicar(acciones.finalizarCompra())).toBe(ESTADO_INICIAL);
        expect(aplicar(acciones.quitarDelCarrito(PALTA))).toBe(ESTADO_INICIAL);
    });

    it('B4 restablecer vuelve a los datos de ejemplo y apaga la bandera', () => {
        const estado = aplicar(acciones.moverAlCarrito(PALTA, 2), acciones.restablecer());
        expect(estado).toBe(ESTADO_INICIAL);
        expect(estado.modificado).toBe(false);
    });

    it('B5 una acción desconocida es un error del programa', () => {
        expect(() => aplicar({ type: 'inventada' })).toThrow('Acción desconocida');
    });
});
