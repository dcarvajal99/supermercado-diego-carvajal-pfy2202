// Página «Nuestras tiendas»: las sucursales con dirección, horario y servicios.
// El filtro por región vive en la URL (?region=biobio), igual que los filtros del
// inventario: se puede compartir el enlace a las tiendas de una sola región.
import { useSearchParams } from 'react-router-dom';
import TarjetaTienda from '../componentes/TarjetaTienda.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { REGIONES, TIENDAS } from '../datos/tiendas.js';

function NuestrasTiendas() {
    useTituloPagina('Nuestras tiendas');
    const [parametros, setParametros] = useSearchParams();

    // Una región desconocida en la URL equivale a «Todas».
    const pedida = parametros.get('region');
    const region = REGIONES.some((item) => item.id === pedida) ? pedida : '';
    const visibles = region === '' ? TIENDAS : TIENDAS.filter((tienda) => tienda.region === region);

    function elegirRegion(id) {
        setParametros(id === '' ? {} : { region: id });
    }

    const opciones = [{ id: '', nombre: 'Todas' }, ...REGIONES];

    return (
        <>
            <div className="encabezado-pagina">
                <h1>Nuestras tiendas</h1>
                <p className="lead mb-0">
                    {TIENDAS.length} sucursales entre el Biobío y La Araucanía, abiertas todos los días.
                </p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 mb-3" role="group" aria-label="Filtrar por región">
                <span className="small text-secondary me-1">Región:</span>
                {opciones.map((opcion) => (
                    <button
                        key={opcion.id}
                        type="button"
                        className={region === opcion.id ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'}
                        aria-pressed={region === opcion.id}
                        onClick={() => elegirRegion(opcion.id)}
                    >
                        {opcion.nombre}
                    </button>
                ))}
            </div>

            <p className="small text-secondary" aria-live="polite">
                {visibles.length === 1 ? '1 tienda' : visibles.length + ' tiendas'}
            </p>

            <ul className="tiendas">
                {visibles.map((tienda) => (
                    <li key={tienda.id}>
                        <TarjetaTienda tienda={tienda} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default NuestrasTiendas;
