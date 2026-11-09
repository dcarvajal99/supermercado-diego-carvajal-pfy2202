// Casos K: reglas del stock (utilidades/inventario.js). Ver pruebas/matriz-de-casos.md.
import { describe, expect, it } from 'vitest';
import { STOCK_MAXIMO, cambioPermitido, recortarStock, stockValido } from '../src/utilidades/inventario.js';

describe('Reglas del stock', () => {
    it('K1 recortarStock deja el valor entre 0 y el máximo', () => {
        expect(recortarStock(-3)).toBe(0);
        expect(recortarStock(5)).toBe(5);
        expect(recortarStock(10500)).toBe(STOCK_MAXIMO);
    });

    it('K2 stockValido acepta solo enteros dentro de los límites', () => {
        expect(stockValido(0)).toBe(true);
        expect(stockValido(STOCK_MAXIMO)).toBe(true);
        expect(stockValido(-1)).toBe(false);
        expect(stockValido(STOCK_MAXIMO + 1)).toBe(false);
        expect(stockValido(2.5)).toBe(false);
        expect(stockValido('5')).toBe(false);
    });

    it('K3 cambioPermitido revisa que el stock resultante siga dentro de los límites', () => {
        expect(cambioPermitido(9, -9)).toBe(true);
        expect(cambioPermitido(9, -10)).toBe(false);
        expect(cambioPermitido(STOCK_MAXIMO - 1, 1)).toBe(true);
        expect(cambioPermitido(STOCK_MAXIMO - 1, 2)).toBe(false);
    });
});
