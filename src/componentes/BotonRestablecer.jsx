// Vuelve el inventario a los datos de ejemplo. Pide confirmación antes, porque borra los
// artículos ingresados y los ajustes de stock guardados en el navegador.
import { useRef, useState } from 'react';
import { BOTON_CHICO, BOTON_CHICO_ACTIVO } from '../utilidades/estilos.js';

function BotonRestablecer({ onRestablecer }) {
    const [preguntando, setPreguntando] = useState(false);
    const botonInicial = useRef(null);

    function cancelar() {
        setPreguntando(false);
        // El foco vuelve al botón que abrió la pregunta, después de dibujarlo otra vez.
        requestAnimationFrame(() => botonInicial.current?.focus());
    }

    return (
        <div className="mt-6 border-t border-borde pt-4">
            <p className="mb-2 text-sm text-suave">
                Los artículos ingresados y los ajustes de stock se guardan en este navegador.
            </p>
            {preguntando ? (
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Confirmar restablecer">
                    <span className="text-sm">¿Volver a los datos de ejemplo?</span>
                    <button type="button" className={BOTON_CHICO_ACTIVO} onClick={onRestablecer} autoFocus>
                        Sí, restablecer
                    </button>
                    <button type="button" className={BOTON_CHICO} onClick={cancelar}>
                        Cancelar
                    </button>
                </div>
            ) : (
                <button ref={botonInicial} type="button" className={BOTON_CHICO} onClick={() => setPreguntando(true)}>
                    Restablecer datos de ejemplo
                </button>
            )}
        </div>
    );
}

export default BotonRestablecer;
