// Tarjeta de una sucursal: dirección, horario, teléfono y servicios.
import { REGIONES } from '../datos/tiendas.js';

function TarjetaTienda({ tienda }) {
    const region = REGIONES.find((item) => item.id === tienda.region)?.completo;

    return (
        <article className="panel h-100">
            <h2 className="h6 mb-1">Despensa Austral {tienda.nombre}</h2>
            <p className="small text-secondary">{region} · desde {tienda.apertura}</p>
            <address className="mb-3">
                {tienda.direccion}, {tienda.comuna}
                <br />
                Teléfono {tienda.telefono}
            </address>
            <h3 className="visually-hidden">Horario</h3>
            <dl className="horario small">
                {tienda.horario.map((tramo) => (
                    <div key={tramo.dias}>
                        <dt>{tramo.dias}</dt>
                        <dd>{tramo.horas}</dd>
                    </div>
                ))}
            </dl>
            <h3 className="visually-hidden">Servicios</h3>
            <ul className="servicios">
                {tienda.servicios.map((servicio) => (
                    <li key={servicio}>{servicio}</li>
                ))}
            </ul>
        </article>
    );
}

export default TarjetaTienda;
