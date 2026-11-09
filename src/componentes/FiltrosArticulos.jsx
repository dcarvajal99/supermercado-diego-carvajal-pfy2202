// Filtros de la lista: categoría, buscador y estado del stock. Son controlados: muestran
// lo que dice la URL y avisan cada cambio a la página.
import Boton from './Boton.jsx';
import GrupoOpciones from './GrupoOpciones.jsx';
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { ESTADOS } from '../utilidades/inventario.js';
import { CAMPO, ETIQUETA } from '../utilidades/estilos.js';

function FiltrosArticulos({ busqueda, categoria, estado, totales, hayFiltros, onCambiar, onLimpiar }) {
    // Una opción por categoría, con cuántos artículos tiene en el inventario completo.
    const categorias = [
        { id: '', nombre: 'Todas', cantidad: totales.todas },
        ...TIPOS_PRODUCTO.map((tipo) => ({ id: tipo.id, nombre: tipo.nombre, cantidad: totales[tipo.id] ?? 0 })),
    ];

    return (
        <div className="mb-3 space-y-3">
            <GrupoOpciones
                etiqueta="Categoría"
                opciones={categorias}
                valor={categoria}
                onElegir={(id) => onCambiar('categoria', id)}
            />
            {/* La búsqueda filtra mientras se escribe: Enter no debe recargar la página */}
            <form className="grid grid-cols-2 items-end gap-2 md:grid-cols-12" role="search" onSubmit={(evento) => evento.preventDefault()}>
                <div className="col-span-2 md:col-span-6">
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
                    <label htmlFor="estado" className={ETIQUETA}>Estado del stock</label>
                    <select id="estado" className={CAMPO} value={estado} onChange={(evento) => onCambiar('estado', evento.target.value)}>
                        <option value="">Todos</option>
                        {ESTADOS.map((item) => (
                            <option key={item.id} value={item.id}>{item.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-3">
                    {hayFiltros && (
                        <Boton className="h-11 w-full" onClick={onLimpiar}>Limpiar filtros</Boton>
                    )}
                </div>
            </form>
        </div>
    );
}

export default FiltrosArticulos;
