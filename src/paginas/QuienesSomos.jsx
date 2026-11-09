// Página «Quiénes somos»: historia, misión, visión, valores y cifras del supermercado.
// Es contenido fijo; las listas se dibujan con map() para no repetir marcado.
import { Link } from 'react-router';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { TIENDAS } from '../datos/tiendas.js';
import { ENLACE, INTRODUCCION, PANEL, SUBTITULO, TITULO_PAGINA } from '../utilidades/estilos.js';

const FUNDACION = 2008;
// Se calcula una vez al cargar el sitio, fuera del render, para que el componente sea puro.
const ANIOS = new Date().getFullYear() - FUNDACION;

const VALORES = [
    { titulo: 'Frescura', texto: 'Frutas, verduras, carnes y pan llegan cada mañana desde productores de la zona sur.' },
    { titulo: 'Precio justo', texto: 'Precios claros y sin letra chica, con ofertas que se anuncian en tienda.' },
    { titulo: 'Cercanía', texto: 'Conocemos a nuestros clientes por su nombre y armamos el surtido con lo que piden.' },
    { titulo: 'Cuidado del entorno', texto: 'Reducimos la merma con un control de stock diario y donamos lo que aún se puede consumir.' },
];

function QuienesSomos() {
    useTituloPagina('Quiénes somos');

    const cifras = [
        { valor: ANIOS, texto: 'años atendiendo' },
        { valor: TIENDAS.length, texto: 'tiendas en tres regiones' },
        { valor: 210, texto: 'colaboradores' },
        { valor: '1.200', texto: 'productos en góndola' },
    ];

    return (
        <>
            <div className="mb-6">
                <h1 className={TITULO_PAGINA}>Quiénes somos</h1>
                <p className={INTRODUCCION + ' text-[1.0625rem]'}>
                    Somos un supermercado de barrio del sur de Chile: tiendas cómodas, productos frescos
                    y un equipo que conoce a sus vecinos.
                </p>
            </div>

            {/* gap-px: las líneas entre cifras son el fondo gris que asoma entre las celdas,
                y funcionan igual con cuatro columnas que con dos filas de dos */}
            <section
                className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-px overflow-hidden rounded-lg border border-borde bg-borde"
                aria-label="Despensa Austral en cifras"
            >
                {cifras.map((cifra) => (
                    <div key={cifra.texto} className="flex flex-col bg-blanco px-5 py-4">
                        <span className="text-xl font-semibold tabular-nums sm:text-2xl">{cifra.valor}</span>
                        <span className="text-[0.8125rem] text-suave">{cifra.texto}</span>
                    </div>
                ))}
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
                <section className="space-y-4 lg:col-span-7" aria-labelledby="titulo-historia">
                    <h2 id="titulo-historia" className={SUBTITULO}>Nuestra historia</h2>
                    <p>
                        Despensa Austral abrió en {FUNDACION} como un almacén de 300 m² en la avenida Los
                        Carrera de Concepción. La idea era simple: tener lo necesario para la semana a pocas
                        cuadras de la casa y a un precio honesto.
                    </p>
                    <p>
                        Con los años llegaron las tiendas de Talcahuano, Chillán, Los Ángeles y Temuco. Cada
                        una mantiene el mismo formato: pasillos ordenados, panadería o verdulería propia y un
                        inventario que se revisa todos los días para que nunca falte lo básico.
                    </p>
                    <p>
                        Este sitio es la herramienta interna con que cada sucursal controla su stock: muestra
                        qué artículos están por agotarse, permite ingresar artículos nuevos y registrar las
                        entradas y salidas del día.
                    </p>
                </section>

                <section className="space-y-3 lg:col-span-5" aria-labelledby="titulo-proposito">
                    <h2 id="titulo-proposito" className="sr-only">Misión y visión</h2>
                    <div className={PANEL}>
                        <h3 className="mb-2 font-semibold">Misión</h3>
                        <p>
                            Abastecer a las familias del sur con productos frescos y de calidad, a precios
                            justos y con una atención cercana.
                        </p>
                    </div>
                    <div className={PANEL}>
                        <h3 className="mb-2 font-semibold">Visión</h3>
                        <p>
                            Ser el supermercado de barrio preferido entre el Biobío y La Araucanía, reconocido
                            por su frescura y por no tener nunca la góndola vacía.
                        </p>
                    </div>
                </section>
            </div>

            <section className="mt-6" aria-labelledby="titulo-valores">
                <h2 id="titulo-valores" className={SUBTITULO + ' mb-3'}>Nuestros valores</h2>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-x-6 gap-y-4">
                    {VALORES.map((valor) => (
                        <li key={valor.titulo} className="border-t-2 border-acento pt-3">
                            <h3 className="mb-1 font-semibold">{valor.titulo}</h3>
                            <p className="text-suave">{valor.texto}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <p className="mt-6">
                ¿Quieres visitarnos? Revisa las direcciones y horarios en{' '}
                <Link to="/nuestras-tiendas" className={ENLACE}>Nuestras tiendas</Link>.
            </p>
        </>
    );
}

export default QuienesSomos;
