// Formulario para registrar una entrada (llegó mercadería) o una salida (venta o
// merma) de un producto. Valida la cantidad antes de tocar el stock y confirma el
// resultado en un mensaje que también anuncia el lector de pantalla.
import { useRef, useState } from 'react';
import { STOCK_MAXIMO } from '../hooks/useInventario.js';
import { contarUnidades, formatearNumero } from '../utilidades/formato.js';

function FormularioMovimiento({ producto, onRegistrar }) {
    const [tipo, setTipo] = useState('entrada'); // 'entrada' o 'salida'
    const [cantidad, setCantidad] = useState('');
    const [error, setError] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const campoCantidad = useRef(null);

    function validar() {
        const numero = Number(cantidad);
        if (cantidad.trim() === '') return 'Ingresa la cantidad de unidades.';
        if (!Number.isInteger(numero) || numero < 1) return 'La cantidad debe ser un número entero mayor que 0.';
        if (tipo === 'salida' && numero > producto.stock) {
            return 'Hay ' + contarUnidades(producto.stock) + ' en stock: la salida no puede ser mayor.';
        }
        if (tipo === 'entrada' && producto.stock + numero > STOCK_MAXIMO) {
            return 'El stock no puede superar las ' + formatearNumero(STOCK_MAXIMO) + ' unidades.';
        }
        return '';
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
            + ' registrada. Stock actual: ' + contarUnidades(producto.stock + cambio) + '.',
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
                <legend className="form-label small mb-2">Tipo de movimiento</legend>
                <div className="btn-group w-100">
                    <input
                        type="radio"
                        className="btn-check"
                        name="tipo"
                        id="tipo-entrada"
                        checked={tipo === 'entrada'}
                        onChange={() => elegirTipo('entrada')}
                    />
                    <label className="btn btn-outline-dark" htmlFor="tipo-entrada">Entrada</label>
                    <input
                        type="radio"
                        className="btn-check"
                        name="tipo"
                        id="tipo-salida"
                        checked={tipo === 'salida'}
                        onChange={() => elegirTipo('salida')}
                    />
                    <label className="btn btn-outline-dark" htmlFor="tipo-salida">Salida</label>
                </div>
            </fieldset>

            <div className="mb-3">
                <label htmlFor="cantidad" className="form-label small">Cantidad de unidades</label>
                <input
                    ref={campoCantidad}
                    id="cantidad"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    className={error ? 'form-control is-invalid' : 'form-control'}
                    value={cantidad}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? 'error-cantidad' : undefined}
                    onChange={(evento) => setCantidad(evento.target.value)}
                />
                {error && <div id="error-cantidad" className="invalid-feedback">{error}</div>}
            </div>

            <button type="submit" className="btn btn-dark w-100">
                {tipo === 'entrada' ? 'Registrar entrada' : 'Registrar salida'}
            </button>
            {/* La región existe siempre, así el lector de pantalla anuncia cada confirmación nueva */}
            <p className="confirmacion small mt-3 mb-0" role="status">{confirmacion}</p>
        </form>
    );
}

export default FormularioMovimiento;
