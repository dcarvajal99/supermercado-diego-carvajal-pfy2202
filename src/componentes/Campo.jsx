// Campo de formulario: etiqueta, control y mensaje de error enlazados entre sí.
// Con children dibuja un <select> (sus opciones); sin children, un <input>.
import { CAMPO, ERROR, ETIQUETA } from '../utilidades/estilos.js';

function Campo({ id, etiqueta, error, ayuda, children, ...propiedades }) {
    const Control = children ? 'select' : 'input';
    const idAyuda = ayuda ? id + '-ayuda' : undefined;
    const idError = error ? id + '-error' : undefined;

    return (
        <div>
            <label htmlFor={id} className={ETIQUETA}>{etiqueta}</label>
            <Control
                id={id}
                name={id}
                className={CAMPO}
                aria-invalid={error ? true : undefined}
                aria-describedby={[idAyuda, idError].filter(Boolean).join(' ') || undefined}
                {...propiedades}
            >
                {children}
            </Control>
            {ayuda && <p id={idAyuda} className="mt-1 text-[0.8125rem] text-suave">{ayuda}</p>}
            {error && <p id={idError} className={ERROR}>{error}</p>}
        </div>
    );
}

export default Campo;
