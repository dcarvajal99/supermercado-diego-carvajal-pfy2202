// Datos de ejemplo del inventario de Despensa Austral.
// El stock de esta lista es el inicial: los cambios que haga la persona se guardan
// aparte, en localStorage (ver hooks/useInventario.js).

// El id de cada categoría es el que viaja en la URL: /?categoria=lacteos
export const CATEGORIAS = [
    { id: 'abarrotes', nombre: 'Abarrotes' },
    { id: 'lacteos', nombre: 'Lácteos' },
    { id: 'frutas-verduras', nombre: 'Frutas y verduras' },
    { id: 'carnes', nombre: 'Carnes' },
    { id: 'panaderia', nombre: 'Panadería' },
    { id: 'bebidas', nombre: 'Bebidas' },
    { id: 'limpieza', nombre: 'Limpieza' },
];

// El id de cada producto forma su dirección: /producto/arroz-grado-2
export const PRODUCTOS = [
    { id: 'arroz-grado-2', sku: 'ABA-001', nombre: 'Arroz grado 2', formato: '1 kg', categoria: 'abarrotes', precio: 1590, stock: 48, stockMinimo: 20, ubicacion: 'Pasillo 3' },
    { id: 'fideos-spaghetti', sku: 'ABA-002', nombre: 'Fideos spaghetti n.º 5', formato: '400 g', categoria: 'abarrotes', precio: 990, stock: 12, stockMinimo: 25, ubicacion: 'Pasillo 3' },
    { id: 'aceite-vegetal', sku: 'ABA-003', nombre: 'Aceite vegetal', formato: '1 L', categoria: 'abarrotes', precio: 2890, stock: 30, stockMinimo: 15, ubicacion: 'Pasillo 4' },
    { id: 'azucar-granulada', sku: 'ABA-004', nombre: 'Azúcar granulada', formato: '1 kg', categoria: 'abarrotes', precio: 1390, stock: 0, stockMinimo: 20, ubicacion: 'Pasillo 4' },
    { id: 'leche-entera', sku: 'LAC-001', nombre: 'Leche entera', formato: '1 L', categoria: 'lacteos', precio: 1150, stock: 64, stockMinimo: 40, ubicacion: 'Refrigerados 1' },
    { id: 'yogur-natural', sku: 'LAC-002', nombre: 'Yogur natural', formato: '120 g', categoria: 'lacteos', precio: 450, stock: 18, stockMinimo: 30, ubicacion: 'Refrigerados 1' },
    { id: 'queso-gauda', sku: 'LAC-003', nombre: 'Queso gauda laminado', formato: '250 g', categoria: 'lacteos', precio: 3490, stock: 22, stockMinimo: 10, ubicacion: 'Refrigerados 2' },
    { id: 'manzana-roja', sku: 'FRU-001', nombre: 'Manzana roja', formato: '1 kg', categoria: 'frutas-verduras', precio: 1490, stock: 85, stockMinimo: 30, ubicacion: 'Verdulería' },
    { id: 'palta-hass', sku: 'FRU-002', nombre: 'Palta hass', formato: '1 kg', categoria: 'frutas-verduras', precio: 4990, stock: 9, stockMinimo: 15, ubicacion: 'Verdulería' },
    { id: 'tomate', sku: 'FRU-003', nombre: 'Tomate', formato: '1 kg', categoria: 'frutas-verduras', precio: 1790, stock: 40, stockMinimo: 20, ubicacion: 'Verdulería' },
    { id: 'pechuga-pollo', sku: 'CAR-001', nombre: 'Pechuga de pollo', formato: '1 kg', categoria: 'carnes', precio: 5990, stock: 14, stockMinimo: 12, ubicacion: 'Carnicería' },
    { id: 'carne-molida', sku: 'CAR-002', nombre: 'Carne molida 10 % grasa', formato: '500 g', categoria: 'carnes', precio: 4290, stock: 0, stockMinimo: 10, ubicacion: 'Carnicería' },
    { id: 'marraqueta', sku: 'PAN-001', nombre: 'Marraqueta', formato: '1 kg', categoria: 'panaderia', precio: 2190, stock: 25, stockMinimo: 15, ubicacion: 'Panadería' },
    { id: 'agua-mineral', sku: 'BEB-001', nombre: 'Agua mineral sin gas', formato: '1,6 L', categoria: 'bebidas', precio: 890, stock: 72, stockMinimo: 36, ubicacion: 'Pasillo 8' },
    { id: 'jugo-naranja', sku: 'BEB-002', nombre: 'Jugo de naranja', formato: '1 L', categoria: 'bebidas', precio: 1690, stock: 20, stockMinimo: 24, ubicacion: 'Pasillo 8' },
    { id: 'detergente-liquido', sku: 'LIM-001', nombre: 'Detergente líquido', formato: '3 L', categoria: 'limpieza', precio: 8990, stock: 16, stockMinimo: 8, ubicacion: 'Pasillo 10' },
    { id: 'papel-higienico', sku: 'LIM-002', nombre: 'Papel higiénico doble hoja', formato: '12 rollos', categoria: 'limpieza', precio: 6490, stock: 5, stockMinimo: 10, ubicacion: 'Pasillo 10' },
    { id: 'lavaloza', sku: 'LIM-003', nombre: 'Lavaloza concentrado', formato: '750 ml', categoria: 'limpieza', precio: 1990, stock: 27, stockMinimo: 12, ubicacion: 'Pasillo 10' },
];
