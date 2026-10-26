// Vuelve el stock a los datos de ejemplo. Pide confirmación antes, porque borra todos
// los ajustes guardados en el navegador.
import { useRef, useState } from 'react';

function BotonRestablecer({ onRestablecer }) {
    const [preguntando, setPreguntando] = useState(false);
    const botonInicial = useRef(null);

    function cancelar() {
        setPreguntando(false);
        // El foco vuelve al botón que abrió la pregunta, después de dibujarlo otra vez.
        requestAnimationFrame(() => botonInicial.current?.focus());
    }

    return (
        <div className="restablecer">
            <p className="small text-secondary mb-2">
                Los ajustes de stock se guardan en este navegador.
            </p>
            {preguntando ? (
                <div className="d-flex flex-wrap align-items-center gap-2" role="group" aria-label="Confirmar restablecer">
                    <span className="small">¿Volver al stock de los datos de ejemplo?</span>
                    <button type="button" className="btn btn-dark btn-sm" onClick={onRestablecer} autoFocus>
                        Sí, restablecer
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-sm" onClick={cancelar}>
                        Cancelar
                    </button>
                </div>
            ) : (
                <button ref={botonInicial} type="button" className="btn btn-outline-dark btn-sm" onClick={() => setPreguntando(true)}>
                    Restablecer datos de ejemplo
                </button>
            )}
        </div>
    );
}

export default BotonRestablecer;
