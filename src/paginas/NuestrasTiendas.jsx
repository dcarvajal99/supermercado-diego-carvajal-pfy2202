// Página «Nuestras tiendas»: las sucursales con dirección, horario y servicios.
// El filtro por región vive en la URL (?region=biobio), igual que los filtros de la
// lista de artículos: se puede compartir el enlace a las tiendas de una sola región.
import { useSearchParams } from 'react-router-dom';
import TarjetaTienda from '../componentes/TarjetaTienda.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { REGIONES, TIENDAS } from '../datos/tiendas.js';
import { BOTON_CHICO, BOTON_CHICO_ACTIVO, INTRODUCCION, TITULO_PAGINA } from '../utilidades/estilos.js';

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
            <div className="mb-6">
                <h1 className={TITULO_PAGINA}>Nuestras tiendas</h1>
                <p className={INTRODUCCION + ' text-[1.0625rem]'}>
                    {TIENDAS.length} sucursales entre el Biobío y La Araucanía, abiertas todos los días.
                </p>
            </div>

            <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por región">
                <span className="mr-1 text-sm text-suave">Región:</span>
                {opciones.map((opcion) => (
                    <button
                        key={opcion.id}
                        type="button"
                        className={region === opcion.id ? BOTON_CHICO_ACTIVO : BOTON_CHICO}
                        aria-pressed={region === opcion.id}
                        onClick={() => elegirRegion(opcion.id)}
                    >
                        {opcion.nombre}
                    </button>
                ))}
            </div>

            <p className="mb-4 text-sm text-suave" aria-live="polite">
                {visibles.length === 1 ? '1 tienda' : visibles.length + ' tiendas'}
            </p>

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-4">
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
