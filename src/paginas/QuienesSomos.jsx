// Página «Quiénes somos»: historia, misión, visión, valores y cifras del supermercado.
// Es contenido fijo; las listas se dibujan con map() para no repetir marcado.
import { Link } from 'react-router-dom';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { TIENDAS } from '../datos/tiendas.js';

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
            <div className="encabezado-pagina">
                <h1>Quiénes somos</h1>
                <p className="lead mb-0">
                    Somos un supermercado de barrio del sur de Chile: tiendas cómodas, productos frescos
                    y un equipo que conoce a sus vecinos.
                </p>
            </div>

            <section className="cifras-empresa" aria-label="Despensa Austral en cifras">
                {cifras.map((cifra) => (
                    <div key={cifra.texto}>
                        <span className="cifra-valor">{cifra.valor}</span>
                        <span className="cifra-detalle">{cifra.texto}</span>
                    </div>
                ))}
            </section>

            <div className="row g-4 mt-1">
                <section className="col-lg-7" aria-labelledby="titulo-historia">
                    <h2 id="titulo-historia" className="h5">Nuestra historia</h2>
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
                    <p className="mb-0">
                        Este sitio es la herramienta interna con que cada sucursal controla su stock: muestra
                        qué productos están por agotarse y permite registrar las entradas y salidas del día.
                    </p>
                </section>

                <section className="col-lg-5" aria-labelledby="titulo-proposito">
                    <h2 id="titulo-proposito" className="visually-hidden">Misión y visión</h2>
                    <div className="panel mb-3">
                        <h3 className="h6">Misión</h3>
                        <p className="mb-0">
                            Abastecer a las familias del sur con productos frescos y de calidad, a precios
                            justos y con una atención cercana.
                        </p>
                    </div>
                    <div className="panel">
                        <h3 className="h6">Visión</h3>
                        <p className="mb-0">
                            Ser el supermercado de barrio preferido entre el Biobío y La Araucanía, reconocido
                            por su frescura y por no tener nunca la góndola vacía.
                        </p>
                    </div>
                </section>
            </div>

            <section className="mt-4" aria-labelledby="titulo-valores">
                <h2 id="titulo-valores" className="h5">Nuestros valores</h2>
                <ul className="valores">
                    {VALORES.map((valor) => (
                        <li key={valor.titulo}>
                            <h3 className="h6 mb-1">{valor.titulo}</h3>
                            <p className="mb-0 text-secondary">{valor.texto}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <p className="mt-4 mb-0">
                ¿Quieres visitarnos? Revisa las direcciones y horarios en{' '}
                <Link to="/nuestras-tiendas">Nuestras tiendas</Link>.
            </p>
        </>
    );
}

export default QuienesSomos;
