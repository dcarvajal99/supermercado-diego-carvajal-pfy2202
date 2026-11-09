// Botón que pregunta antes de una acción que no se puede deshacer: restablecer los datos,
// vaciar el carrito o finalizar la compra. Si se cancela, el foco vuelve al botón inicial.
import { useRef, useState } from 'react';
import Boton from './Boton.jsx';

function BotonConfirmar({ texto, pregunta, confirmar, onConfirmar, variante = 'secundario', className = '' }) {
    const [preguntando, setPreguntando] = useState(false);
    const botonInicial = useRef(null);

    function cancelar() {
        setPreguntando(false);
        // El foco vuelve al botón que abrió la pregunta, después de dibujarlo otra vez.
        requestAnimationFrame(() => botonInicial.current?.focus());
    }

    if (!preguntando) {
        return (
            <Boton ref={botonInicial} variante={variante} className={className} onClick={() => setPreguntando(true)}>
                {texto}
            </Boton>
        );
    }

    return (
        <div className={'flex flex-wrap items-center gap-2 ' + className} role="group" aria-label={pregunta}>
            <span className="text-sm">{pregunta}</span>
            <Boton tamano="chico" variante="principal" onClick={onConfirmar} autoFocus>
                {confirmar}
            </Boton>
            <Boton tamano="chico" onClick={cancelar}>
                Cancelar
            </Boton>
        </div>
    );
}

export default BotonConfirmar;
