// Mensaje de confirmación con el borde del acento. La región role="status" existe siempre
// y solo cambia su contenido: así el lector de pantalla anuncia cada mensaje nuevo.
// enPanel: dentro de un panel blanco, el aviso usa el fondo gris para distinguirse.
import Boton from './Boton.jsx';

function Aviso({ children, onCerrar, enPanel = false, className = '' }) {
    const fondo = enPanel ? 'bg-lienzo' : 'bg-blanco';

    return (
        <div role="status" className={className}>
            {children && (
                <div className={'flex flex-wrap items-center justify-between gap-2 border-l-2 border-acento px-3 py-2 text-sm ' + fondo}>
                    <span>{children}</span>
                    {onCerrar && <Boton tamano="chico" onClick={onCerrar}>Cerrar</Boton>}
                </div>
            )}
        </div>
    );
}

export default Aviso;
