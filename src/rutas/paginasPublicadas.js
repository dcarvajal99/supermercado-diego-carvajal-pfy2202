// Páginas que GitHub Pages debe servir con estado 200 al abrirlas directo o recargarlas.
// vite.config.js copia index.html con cada uno de estos nombres. Es una lista propia de la
// construcción: no importa los datos del inventario.
//
// Si cambian las rutas o los artículos de ejemplo, las pruebas de pruebas/rutas.test.jsx
// avisan qué página falta o sobra en esta lista.

// Rutas fijas de rutas/AppRoutes.jsx, sin la barra inicial (el inicio ya es index.html).
export const PAGINAS_FIJAS = ['articulos', 'ingresar-articulo', 'carrito', 'quienes-somos', 'nuestras-tiendas'];

// Detalle de los artículos de ejemplo. Los que ingresa cada persona solo existen en su
// navegador: GitHub Pages los atiende con 404.html, que carga la misma aplicación.
export const ARTICULOS_PUBLICADOS = [
    'arroz-grado-2', 'fideos-spaghetti', 'aceite-vegetal', 'azucar-granulada',
    'leche-entera', 'yogur-natural', 'queso-gauda',
    'manzana-roja', 'palta-hass', 'tomate',
    'pechuga-pollo', 'carne-molida', 'marraqueta',
    'agua-mineral', 'jugo-naranja',
    'detergente-liquido', 'papel-higienico', 'lavaloza',
];

export const PAGINAS_PUBLICADAS = [...PAGINAS_FIJAS, ...ARTICULOS_PUBLICADOS.map((id) => 'articulo/' + id)];
