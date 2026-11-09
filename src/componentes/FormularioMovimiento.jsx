// Formulario para registrar una entrada (llegó mercadería) o una salida (venta o
// merma) de un artículo. Valida la cantidad antes de tocar el stock y confirma el
// resultado en un mensaje que también anuncia el lector de pantalla.
import { useRef, useState } from 'react';
import Aviso from './Aviso.jsx';
import Boton from './Boton.jsx';
import { CAMPO, ERROR, ETIQUETA } from '../utilidades/estilos.js';
import { contarUnidades, formatearNumero } from '../utilidades/formato.js';
import { PATRONES } from '../utilidades/validaciones.js';
import { STOCK_MAXIMO, cambioPermitido } from '../utilidades/inventario.js';

// has-checked: la etiqueta se rellena según el estado del radio escondido en su interior.
const OPCION = 'block cursor-pointer px-4 py-2 text-center has-checked:bg-tinta has-checked:text-blanco has-focus-visible:outline-2 has-focus-visible:-outline-offset-4 has-focus-visible:outline-acento';

function FormularioMovimiento({ articulo, onRegistrar }) {
    const [tipo, setTipo] = useState('entrada'); // 'entrada' o 'salida'
    const [cantidad, setCantidad] = useState('');
    const [error, setError] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const campoCantidad = useRef(null);

    // Los límites del stock se revisan con cambioPermitido(), la misma regla que usa el reductor.
    function validar() {
        const valor = cantidad.trim();
        if (valor === '') return 'Ingresa la cantidad de unidades.';
        if (!PATRONES.entero.test(valor) || Number(valor) < 1) return 'La cantidad debe ser un número entero mayor que 0.';
        const cambio = tipo === 'entrada' ? Number(valor) : -Number(valor);
        if (cambioPermitido(articulo.stock, cambio)) return '';
        return tipo === 'salida'
            ? 'Hay ' + contarUnidades(articulo.stock) + ' en stock: la salida no puede ser mayor.'
            : 'El stock no puede superar las ' + formatearNumero(STOCK_MAXIMO) + ' unidades.';
    }

    function registrar(evento) {
        evento.preventDefault();
        const problema = validar();
        setError(problema);
        setConfirmacion('');
        if (problema) {
            campoCantidad.current.focus();
            return;
        }
        const cambio = tipo === 'entrada' ? Number(cantidad) : -Number(cantidad);
        onRegistrar(cambio);
        setConfirmacion(
            (tipo === 'entrada' ? 'Entrada' : 'Salida') + ' de ' + contarUnidades(Math.abs(cambio))
            + ' registrada. Stock actual: ' + contarUnidades(articulo.stock + cambio) + '.',
        );
        setCantidad('');
    }

    function elegirTipo(nuevo) {
        setTipo(nuevo);
        setError('');
    }

    return (
        <form noValidate onSubmit={registrar}>
            <fieldset className="mb-3">
                <legend className={ETIQUETA}>Tipo de movimiento</legend>
                <div className="grid grid-cols-2 overflow-hidden rounded-md border border-tinta">
                    <label className={OPCION}>
                        <input
                            type="radio"
                            className="sr-only"
                            name="tipo"
                            checked={tipo === 'entrada'}
                            onChange={() => elegirTipo('entrada')}
                        />
                        Entrada
                    </label>
                    <label className={OPCION}>
                        <input
                            type="radio"
                            className="sr-only"
                            name="tipo"
                            checked={tipo === 'salida'}
                            onChange={() => elegirTipo('salida')}
                        />
                        Salida
                    </label>
                </div>
            </fieldset>

            <div className="mb-3">
                <label htmlFor="cantidad" className={ETIQUETA}>Cantidad de unidades</label>
                <input
                    ref={campoCantidad}
                    id="cantidad"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    className={CAMPO}
                    value={cantidad}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? 'error-cantidad' : undefined}
                    onChange={(evento) => setCantidad(evento.target.value)}
                />
                {error && <p id="error-cantidad" className={ERROR}>{error}</p>}
            </div>

            <Boton type="submit" className="w-full">
                {tipo === 'entrada' ? 'Registrar entrada' : 'Registrar salida'}
            </Boton>
            <Aviso enPanel className="mt-3">{confirmacion}</Aviso>
        </form>
    );
}

export default FormularioMovimiento;
