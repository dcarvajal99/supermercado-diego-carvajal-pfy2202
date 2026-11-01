// Página para ingresar un artículo nuevo al inventario.
import FormularioArticulo from '../componentes/FormularioArticulo.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { INTRODUCCION, PANEL, TITULO_PAGINA } from '../utilidades/estilos.js';

function IngresarArticulo() {
    useTituloPagina('Ingresar artículo');

    return (
        <>
            <div className="mb-6">
                <h1 className={TITULO_PAGINA}>Ingresar artículo</h1>
                <p className={INTRODUCCION}>
                    Completa los datos del artículo nuevo. Quedará disponible de inmediato en la lista del inventario.
                </p>
            </div>
            <section className={PANEL + ' max-w-3xl'} aria-label="Datos del artículo">
                <FormularioArticulo />
            </section>
        </>
    );
}

export default IngresarArticulo;
