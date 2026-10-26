import { copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages no conoce las rutas de React Router: si alguien recarga
// /quienes-somos, el servidor busca ese archivo, no lo encuentra y responde con
// 404.html. Copiar index.html como 404.html hace que esa respuesta cargue la misma
// aplicación, y BrowserRouter dibuja la página que corresponde a la URL.
function copiarComo404() {
    return {
        name: 'copiar-como-404',
        apply: 'build',
        writeBundle(opciones) {
            copyFileSync(join(opciones.dir, 'index.html'), join(opciones.dir, '404.html'));
        },
    };
}

// GitHub Pages publica el repositorio en /supermercado-diego-carvajal-pfy2202/, no en
// la raíz del dominio: la base le indica a Vite desde qué ruta se sirven los archivos,
// y main.jsx usa la misma base para las rutas de React Router.
export default defineConfig({
    base: '/supermercado-diego-carvajal-pfy2202/',
    plugins: [react(), copiarComo404()],
});
