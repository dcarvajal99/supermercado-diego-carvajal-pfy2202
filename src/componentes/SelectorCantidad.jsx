// Control − cantidad + para elegir o cambiar una cantidad de a una unidad. Lo usan el
// detalle (cuántas unidades agregar al carrito) y cada línea del carrito.
// En el límite los botones quedan con aria-disabled en vez de disabled: así el foco no se pierde.
import Boton from './Boton.jsx';

function SelectorCantidad({ cantidad, nombre, puedeRestar, puedeSumar, onRestar, onSumar }) {
    return (
        <div className="inline-flex items-center gap-1.5" role="group" aria-label={'Cantidad de ' + nombre}>
            <Boton
                tamano="icono"
                aria-label={'Restar una unidad de ' + nombre}
                aria-disabled={!puedeRestar}
                onClick={() => puedeRestar && onRestar()}
            >
                −
            </Boton>
            <span className="min-w-10 text-center font-semibold tabular-nums">{cantidad}</span>
            <Boton
                tamano="icono"
                aria-label={'Sumar una unidad de ' + nombre}
                aria-disabled={!puedeSumar}
                onClick={() => puedeSumar && onSumar()}
            >
                +
            </Boton>
        </div>
    );
}

export default SelectorCantidad;
