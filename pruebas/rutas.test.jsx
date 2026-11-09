// Casos N: navegación. Comprueba qué ruta responde a cada dirección usando el mismo árbol
// de rutas de la aplicación (sin dibujar páginas), y que la lista de páginas publicadas
// coincida con las rutas y con los artículos de ejemplo. Ver pruebas/matriz-de-casos.md.
import { createRoutesFromElements, matchRoutes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { ARBOL_RUTAS } from '../src/rutas/AppRoutes.jsx';
import { ARTICULOS_PUBLICADOS, PAGINAS_FIJAS } from '../src/rutas/paginasPublicadas.js';
import { ARTICULOS_INICIALES } from '../src/datos/articulos.js';

const RUTAS = createRoutesFromElements(ARBOL_RUTAS);

// La ruta final que atiende una dirección: su path ('(índice)' para el inicio) y sus parámetros.
function resolver(direccion) {
    const ultima = matchRoutes(RUTAS, direccion).at(-1);
    return { ruta: ultima.route.index ? '(índice)' : ultima.route.path, parametros: ultima.params };
}

describe('Navegación', () => {
    it('N1 cada dirección del sitio llega a su ruta', () => {
        expect(resolver('/').ruta).toBe('(índice)');
        expect(resolver('/articulos').ruta).toBe('articulos');
        expect(resolver('/ingresar-articulo').ruta).toBe('ingresar-articulo');
        expect(resolver('/carrito').ruta).toBe('carrito');
        expect(resolver('/quienes-somos').ruta).toBe('quienes-somos');
        expect(resolver('/nuestras-tiendas').ruta).toBe('nuestras-tiendas');
    });

    it('N2 la ruta dinámica entrega el id del artículo', () => {
        expect(resolver('/articulo/palta-hass')).toEqual({ ruta: 'articulo/:id', parametros: { id: 'palta-hass' } });
    });

    it('N3 las direcciones que no existen caen en la página no encontrada', () => {
        expect(resolver('/ofertas').ruta).toBe('*');
        expect(resolver('/articulo').ruta).toBe('*');
        expect(resolver('/articulos/extra').ruta).toBe('*');
    });

    it('N4 las páginas publicadas son exactamente las rutas fijas del árbol', () => {
        const fijas = RUTAS[0].children
            .map((ruta) => ruta.path)
            .filter((path) => path && path !== '*' && !path.includes(':'));
        expect([...PAGINAS_FIJAS].sort()).toEqual(fijas.sort());
    });

    it('N5 se publica el detalle de cada artículo de ejemplo, ni más ni menos', () => {
        expect([...ARTICULOS_PUBLICADOS].sort()).toEqual(ARTICULOS_INICIALES.map((articulo) => articulo.id).sort());
    });
});
