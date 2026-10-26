// Filtros del inventario: buscador, categoría y estado del stock. Son campos
// controlados: muestran lo que dice la URL y avisan cada cambio a la página Inicio.
import { CATEGORIAS } from '../datos/productos.js';
import { ESTADOS } from '../utilidades/inventario.js';

function FiltrosInventario({ busqueda, categoria, estado, hayFiltros, onCambiar, onLimpiar }) {
    return (
        // La búsqueda filtra mientras se escribe: Enter no debe recargar la página.
        <form className="row g-2 align-items-end mb-3" role="search" onSubmit={(evento) => evento.preventDefault()}>
            <div className="col-12 col-md-5">
                <label htmlFor="busqueda" className="form-label small">Buscar por nombre o SKU</label>
                <input
                    id="busqueda"
                    type="search"
                    className="form-control"
                    placeholder="Ej.: arroz o ABA-001"
                    value={busqueda}
                    onChange={(evento) => onCambiar('q', evento.target.value, { reemplazar: true })}
                />
            </div>
            <div className="col-6 col-md-3">
                <label htmlFor="categoria" className="form-label small">Categoría</label>
                <select
                    id="categoria"
                    className="form-select"
                    value={categoria}
                    onChange={(evento) => onCambiar('categoria', evento.target.value)}
                >
                    <option value="">Todas</option>
                    {CATEGORIAS.map((item) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col-6 col-md-2">
                <label htmlFor="estado" className="form-label small">Estado</label>
                <select
                    id="estado"
                    className="form-select"
                    value={estado}
                    onChange={(evento) => onCambiar('estado', evento.target.value)}
                >
                    <option value="">Todos</option>
                    {ESTADOS.map((item) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col-12 col-md-2">
                {hayFiltros && (
                    <button type="button" className="btn btn-outline-dark w-100" onClick={onLimpiar}>
                        Limpiar filtros
                    </button>
                )}
            </div>
        </form>
    );
}

export default FiltrosInventario;
