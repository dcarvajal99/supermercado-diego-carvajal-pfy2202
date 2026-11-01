// Datos de ejemplo del inventario de Despensa Austral. Son el punto de partida del
// estado global: los artículos nuevos y los ajustes de stock se guardan en localStorage
// (ver contexto/InventarioProvider.jsx). Las marcas son ficticias.

// El id de cada tipo es el que viaja en la URL (/articulos?tipo=lacteos) y el prefijo
// forma el SKU de los artículos nuevos (LAC-004).
export const TIPOS_PRODUCTO = [
    { id: 'abarrotes', nombre: 'Abarrotes', prefijo: 'ABA' },
    { id: 'lacteos', nombre: 'Lácteos', prefijo: 'LAC' },
    { id: 'frutas-verduras', nombre: 'Frutas y verduras', prefijo: 'FRU' },
    { id: 'carnes', nombre: 'Carnes', prefijo: 'CAR' },
    { id: 'panaderia', nombre: 'Panadería', prefijo: 'PAN' },
    { id: 'bebidas', nombre: 'Bebidas', prefijo: 'BEB' },
    { id: 'limpieza', nombre: 'Limpieza', prefijo: 'LIM' },
];

// El id de cada artículo forma su dirección: /articulo/arroz-grado-2
export const ARTICULOS_INICIALES = [
    { id: 'arroz-grado-2', sku: 'ABA-001', nombre: 'Arroz grado 2', marca: 'Valle Austral', tipo: 'abarrotes', formato: '1 kg', precio: 1590, stock: 48, stockMinimo: 20, ubicacion: 'Pasillo 3' },
    { id: 'fideos-spaghetti', sku: 'ABA-002', nombre: 'Fideos spaghetti n.º 5', marca: 'Don Anselmo', tipo: 'abarrotes', formato: '400 g', precio: 990, stock: 12, stockMinimo: 25, ubicacion: 'Pasillo 3' },
    { id: 'aceite-vegetal', sku: 'ABA-003', nombre: 'Aceite vegetal', marca: 'Valle Austral', tipo: 'abarrotes', formato: '1 L', precio: 2890, stock: 30, stockMinimo: 15, ubicacion: 'Pasillo 4' },
    { id: 'azucar-granulada', sku: 'ABA-004', nombre: 'Azúcar granulada', marca: 'Don Anselmo', tipo: 'abarrotes', formato: '1 kg', precio: 1390, stock: 0, stockMinimo: 20, ubicacion: 'Pasillo 4' },
    { id: 'leche-entera', sku: 'LAC-001', nombre: 'Leche entera', marca: 'La Pradera', tipo: 'lacteos', formato: '1 L', precio: 1150, stock: 64, stockMinimo: 40, ubicacion: 'Refrigerados 1' },
    { id: 'yogur-natural', sku: 'LAC-002', nombre: 'Yogur natural', marca: 'La Pradera', tipo: 'lacteos', formato: '120 g', precio: 450, stock: 18, stockMinimo: 30, ubicacion: 'Refrigerados 1' },
    { id: 'queso-gauda', sku: 'LAC-003', nombre: 'Queso gauda laminado', marca: 'Lago Azul', tipo: 'lacteos', formato: '250 g', precio: 3490, stock: 22, stockMinimo: 10, ubicacion: 'Refrigerados 2' },
    { id: 'manzana-roja', sku: 'FRU-001', nombre: 'Manzana roja', marca: 'Huerto del Sur', tipo: 'frutas-verduras', formato: '1 kg', precio: 1490, stock: 85, stockMinimo: 30, ubicacion: 'Verdulería' },
    { id: 'palta-hass', sku: 'FRU-002', nombre: 'Palta hass', marca: 'Huerto del Sur', tipo: 'frutas-verduras', formato: '1 kg', precio: 4990, stock: 9, stockMinimo: 15, ubicacion: 'Verdulería' },
    { id: 'tomate', sku: 'FRU-003', nombre: 'Tomate', marca: 'Huerto del Sur', tipo: 'frutas-verduras', formato: '1 kg', precio: 1790, stock: 40, stockMinimo: 20, ubicacion: 'Verdulería' },
    { id: 'pechuga-pollo', sku: 'CAR-001', nombre: 'Pechuga de pollo', marca: 'Granja Bellavista', tipo: 'carnes', formato: '1 kg', precio: 5990, stock: 14, stockMinimo: 12, ubicacion: 'Carnicería' },
    { id: 'carne-molida', sku: 'CAR-002', nombre: 'Carne molida 10 % grasa', marca: 'Granja Bellavista', tipo: 'carnes', formato: '500 g', precio: 4290, stock: 0, stockMinimo: 10, ubicacion: 'Carnicería' },
    { id: 'marraqueta', sku: 'PAN-001', nombre: 'Marraqueta', marca: 'Despensa Austral', tipo: 'panaderia', formato: '1 kg', precio: 2190, stock: 25, stockMinimo: 15, ubicacion: 'Panadería' },
    { id: 'agua-mineral', sku: 'BEB-001', nombre: 'Agua mineral sin gas', marca: 'Fuente Clara', tipo: 'bebidas', formato: '1,6 L', precio: 890, stock: 72, stockMinimo: 36, ubicacion: 'Pasillo 8' },
    { id: 'jugo-naranja', sku: 'BEB-002', nombre: 'Jugo de naranja', marca: 'Fuente Clara', tipo: 'bebidas', formato: '1 L', precio: 1690, stock: 20, stockMinimo: 24, ubicacion: 'Pasillo 8' },
    { id: 'detergente-liquido', sku: 'LIM-001', nombre: 'Detergente líquido', marca: 'Casa Limpia', tipo: 'limpieza', formato: '3 L', precio: 8990, stock: 16, stockMinimo: 8, ubicacion: 'Pasillo 10' },
    { id: 'papel-higienico', sku: 'LIM-002', nombre: 'Papel higiénico doble hoja', marca: 'Casa Limpia', tipo: 'limpieza', formato: '12 rollos', precio: 6490, stock: 5, stockMinimo: 10, ubicacion: 'Pasillo 10' },
    { id: 'lavaloza', sku: 'LIM-003', nombre: 'Lavaloza concentrado', marca: 'Casa Limpia', tipo: 'limpieza', formato: '750 ml', precio: 1990, stock: 27, stockMinimo: 12, ubicacion: 'Pasillo 10' },
];
