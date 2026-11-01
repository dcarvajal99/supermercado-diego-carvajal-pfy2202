// Filtros de la lista: buscador, tipo de producto y estado del stock. Son campos
// controlados: muestran lo que dice la URL y avisan cada cambio a la página.
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { ESTADOS } from '../utilidades/inventario.js';
import { BOTON_SECUNDARIO, CAMPO, ETIQUETA } from '../utilidades/estilos.js';

function FiltrosArticulos({ busqueda, tipo, estado, hayFiltros, onCambiar, onLimpiar }) {
    return (
        // La búsqueda filtra mientras se escribe: Enter no debe recargar la página.
        <form className="mb-3 grid grid-cols-2 items-end gap-2 md:grid-cols-12" role="search" onSubmit={(evento) => evento.preventDefault()}>
            <div className="col-span-2 md:col-span-5">
                <label htmlFor="busqueda" className={ETIQUETA}>Buscar por nombre, marca o SKU</label>
                <input
                    id="busqueda"
                    type="search"
                    className={CAMPO}
                    placeholder="Ej.: arroz o ABA-001"
                    value={busqueda}
                    onChange={(evento) => onCambiar('q', evento.target.value, { reemplazar: true })}
                />
            </div>
            <div className="md:col-span-3">
                <label htmlFor="tipo" className={ETIQUETA}>Tipo de producto</label>
                <select id="tipo" className={CAMPO} value={tipo} onChange={(evento) => onCambiar('tipo', evento.target.value)}>
                    <option value="">Todos</option>
                    {TIPOS_PRODUCTO.map((item) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="estado" className={ETIQUETA}>Estado</label>
                <select id="estado" className={CAMPO} value={estado} onChange={(evento) => onCambiar('estado', evento.target.value)}>
                    <option value="">Todos</option>
                    {ESTADOS.map((item) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col-span-2 md:col-span-2">
                {hayFiltros && (
                    <button type="button" className={BOTON_SECUNDARIO + ' w-full'} onClick={onLimpiar}>
                        Limpiar filtros
                    </button>
                )}
            </div>
        </form>
    );
}

export default FiltrosArticulos;
