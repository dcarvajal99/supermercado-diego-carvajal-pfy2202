import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PRODUCTOS } from './src/datos/productos.js';

// Rutas del sitio (las mismas de App.jsx), sin la barra inicial.
const RUTAS = ['quienes-somos', 'nuestras-tiendas', ...PRODUCTOS.map((producto) => 'producto/' + producto.id)];

// GitHub Pages no conoce las rutas de React Router: al recargar /quienes-somos busca
// un archivo con ese nombre. Para cada ruta se copia index.html como <ruta>.html, que
// Pages sirve con estado 200, y BrowserRouter dibuja la página que corresponde a la URL.
// La copia 404.html atiende las direcciones que no existen: responde con estado 404,
// carga la misma aplicación y React Router muestra la página «no encontrada».
function copiarRutas() {
    return {
        name: 'copiar-rutas',
        apply: 'build',
        writeBundle(opciones) {
            const indice = join(opciones.dir, 'index.html');
            for (const ruta of [...RUTAS, '404']) {
                const destino = join(opciones.dir, ruta + '.html');
                mkdirSync(dirname(destino), { recursive: true });
                copyFileSync(indice, destino);
            }
        },
    };
}

// GitHub Pages publica el repositorio en /supermercado-diego-carvajal-pfy2202/, no en
// la raíz del dominio: la base le indica a Vite desde qué ruta se sirven los archivos,
// y main.jsx usa la misma base para las rutas de React Router.
export default defineConfig({
    base: '/supermercado-diego-carvajal-pfy2202/',
    plugins: [react(), copiarRutas()],
});
