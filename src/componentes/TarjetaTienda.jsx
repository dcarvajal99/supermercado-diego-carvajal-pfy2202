// Tarjeta de una sucursal: dirección, horario, teléfono y servicios.
import { REGIONES } from '../datos/tiendas.js';
import { PANEL } from '../utilidades/estilos.js';

function TarjetaTienda({ tienda }) {
    const region = REGIONES.find((item) => item.id === tienda.region)?.completo;

    return (
        <article className={PANEL + ' h-full'}>
            <h2 className="mb-1 font-semibold">Despensa Austral {tienda.nombre}</h2>
            <p className="mb-4 text-sm text-suave">{region} · desde {tienda.apertura}</p>
            <address className="mb-4 not-italic">
                {tienda.direccion}, {tienda.comuna}
                <br />
                Teléfono {tienda.telefono}
            </address>
            <h3 className="sr-only">Horario</h3>
            <dl className="mb-4 text-sm">
                {tienda.horario.map((tramo) => (
                    <div key={tramo.dias} className="flex justify-between gap-4 border-b border-borde py-1.5">
                        <dt className="font-medium">{tramo.dias}</dt>
                        <dd className="text-suave">{tramo.horas}</dd>
                    </div>
                ))}
            </dl>
            <h3 className="sr-only">Servicios</h3>
            <ul className="flex flex-wrap gap-1.5">
                {tienda.servicios.map((servicio) => (
                    <li key={servicio} className="rounded-full border border-borde px-2 py-0.5 text-xs text-suave">
                        {servicio}
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default TarjetaTienda;
