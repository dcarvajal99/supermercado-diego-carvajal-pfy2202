import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PAGINAS_PUBLICADAS } from './src/rutas/paginasPublicadas.js';

// GitHub Pages no conoce las rutas de React Router: al recargar /quienes-somos busca
// un archivo con ese nombre. Para cada página de PAGINAS_PUBLICADAS (una lista propia de
// la construcción, sin datos del inventario) se copia index.html como <ruta>.html, que
// Pages sirve con estado 200, y BrowserRouter dibuja la página que corresponde a la URL.
// La copia 404.html atiende todo lo demás: las direcciones que no existen y los artículos
// ingresados por la persona, que solo viven en su navegador. Responde con estado 404,
// pero carga la misma aplicación y React Router muestra lo que corresponda.
function copiarRutas() {
    return {
        name: 'copiar-rutas',
        apply: 'build',
        writeBundle(opciones) {
            const indice = join(opciones.dir, 'index.html');
            for (const ruta of [...PAGINAS_PUBLICADAS, '404']) {
                const destino = join(opciones.dir, ruta + '.html');
                mkdirSync(dirname(destino), { recursive: true });
                copyFileSync(indice, destino);
            }
        },
    };
}

// GitHub Pages publica el repositorio en /supermercado-diego-carvajal-pfy2202/, no en
// la raíz del dominio: la base le indica a Vite desde qué ruta se sirven los archivos,
// y App.jsx usa la misma base para las rutas de React Router.
export default defineConfig({
    base: '/supermercado-diego-carvajal-pfy2202/',
    plugins: [react(), tailwindcss(), copiarRutas()],
    // Pruebas automáticas (npm test): funciones puras, reductor, persistencia y rutas.
    test: {
        include: ['pruebas/**/*.test.{js,jsx}'],
        environment: 'node',
    },
});
