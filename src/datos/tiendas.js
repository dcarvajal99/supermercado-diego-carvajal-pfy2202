// Sucursales de Despensa Austral que muestra la página «Nuestras tiendas».
// Los datos son ficticios: el supermercado se creó para esta actividad.

// El id de cada región es el que viaja en la URL: /nuestras-tiendas?region=biobio
export const REGIONES = [
    { id: 'biobio', nombre: 'Biobío', completo: 'Región del Biobío' },
    { id: 'nuble', nombre: 'Ñuble', completo: 'Región de Ñuble' },
    { id: 'araucania', nombre: 'La Araucanía', completo: 'Región de La Araucanía' },
];

const HORARIO_GENERAL = [
    { dias: 'Lunes a sábado', horas: '8:30 a 22:00' },
    { dias: 'Domingo y festivos', horas: '9:00 a 21:00' },
];

export const TIENDAS = [
    {
        id: 'concepcion-centro',
        nombre: 'Concepción Centro',
        region: 'biobio',
        direccion: 'Av. Los Carrera 1450',
        comuna: 'Concepción',
        telefono: '+56 41 290 1450',
        apertura: 2008,
        horario: HORARIO_GENERAL,
        servicios: ['Estacionamiento', 'Retiro en tienda', 'Panadería propia'],
    },
    {
        id: 'talcahuano',
        nombre: 'Talcahuano',
        region: 'biobio',
        direccion: 'Av. Colón 3020',
        comuna: 'Talcahuano',
        telefono: '+56 41 290 3020',
        apertura: 2012,
        horario: HORARIO_GENERAL,
        servicios: ['Estacionamiento', 'Pescadería'],
    },
    {
        id: 'los-angeles',
        nombre: 'Los Ángeles',
        region: 'biobio',
        direccion: 'Av. Alemania 820',
        comuna: 'Los Ángeles',
        telefono: '+56 43 290 0820',
        apertura: 2016,
        horario: HORARIO_GENERAL,
        servicios: ['Estacionamiento', 'Retiro en tienda'],
    },
    {
        id: 'chillan',
        nombre: 'Chillán',
        region: 'nuble',
        direccion: 'Av. Libertad 655',
        comuna: 'Chillán',
        telefono: '+56 42 290 0655',
        apertura: 2014,
        horario: [
            { dias: 'Lunes a sábado', horas: '9:00 a 21:30' },
            { dias: 'Domingo y festivos', horas: '10:00 a 20:00' },
        ],
        servicios: ['Retiro en tienda', 'Panadería propia'],
    },
    {
        id: 'temuco',
        nombre: 'Temuco',
        region: 'araucania',
        direccion: 'Av. Alemania 0945',
        comuna: 'Temuco',
        telefono: '+56 45 290 0945',
        apertura: 2019,
        horario: HORARIO_GENERAL,
        servicios: ['Estacionamiento', 'Retiro en tienda', 'Panadería propia'],
    },
];
