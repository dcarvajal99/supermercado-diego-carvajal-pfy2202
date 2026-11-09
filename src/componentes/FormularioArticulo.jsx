// Formulario para ingresar un artículo nuevo. Usa el estado global directamente: lee la
// lista para detectar duplicados, arma el artículo con crearArticulo() y lo agrega con
// agregarArticulo(). Después navega a la lista, que lo muestra primero y resaltado.
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Boton from './Boton.jsx';
import Campo from './Campo.jsx';
import { useInventario } from '../contexto/InventarioContext.js';
import { TIPOS_PRODUCTO } from '../datos/articulos.js';
import { useFocoCampos } from '../hooks/useFocoCampos.js';
import { crearArticulo } from '../utilidades/inventario.js';
import { validarArticulo } from '../utilidades/validaciones.js';

const VACIO = { nombre: '', marca: '', tipo: '', formato: '', precio: '', stock: '', stockMinimo: '', ubicacion: '' };

function FormularioArticulo() {
    const { articulos, agregarArticulo } = useInventario();
    const navegar = useNavigate();
    const [valores, setValores] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const { registrar, enfocar } = useFocoCampos();

    // Un solo manejador para todos los campos: el atributo name dice cuál cambió.
    function cambiar(evento) {
        const { name, value } = evento.target;
        setValores((actuales) => ({ ...actuales, [name]: value }));
        // El error de un campo desaparece apenas se corrige.
        if (errores[name]) setErrores(({ [name]: _corregido, ...resto }) => resto);
    }

    function guardar(evento) {
        evento.preventDefault();
        const encontrados = validarArticulo(valores, articulos);
        setErrores(encontrados);

        // Con errores, el foco va al primer campo por corregir, por su referencia.
        const primero = Object.keys(encontrados)[0];
        if (primero) {
            enfocar(primero);
            return;
        }

        const articulo = crearArticulo(valores, articulos);
        agregarArticulo(articulo);
        navegar('/articulos', { state: { agregado: articulo.id } });
    }

    // Propiedades comunes de cada campo: id, referencia, valor, error y manejador.
    function campo(id) {
        return { id, ref: registrar(id), value: valores[id], error: errores[id], onChange: cambiar };
    }

    return (
        <form noValidate onSubmit={guardar}>
            <div className="grid gap-4 md:grid-cols-2">
                <Campo {...campo('nombre')} etiqueta="Nombre" autoComplete="off" required />
                <Campo {...campo('marca')} etiqueta="Marca" autoComplete="off" required />
                <Campo {...campo('tipo')} etiqueta="Categoría (tipo de producto)" required>
                    <option value="">Elige una categoría</option>
                    {TIPOS_PRODUCTO.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    ))}
                </Campo>
                <Campo {...campo('formato')} etiqueta="Formato" ayuda="Por ejemplo: 1 kg, 500 ml o 12 rollos." autoComplete="off" required />
                <Campo {...campo('precio')} etiqueta="Precio de venta" ayuda="En pesos, solo números: sin puntos ni decimales." type="number" inputMode="numeric" min="1" step="1" required />
                <Campo {...campo('ubicacion')} etiqueta="Ubicación (opcional)" ayuda="Por ejemplo: Pasillo 3." autoComplete="off" />
                <Campo {...campo('stock')} etiqueta="Stock inicial" type="number" inputMode="numeric" min="0" step="1" required />
                <Campo {...campo('stockMinimo')} etiqueta="Stock mínimo" ayuda="Bajo esta cantidad el artículo aparece por reponer." type="number" inputMode="numeric" min="0" step="1" required />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
                <Boton type="submit" variante="principal">Guardar artículo</Boton>
                <Boton ruta="/articulos">Cancelar</Boton>
            </div>
        </form>
    );
}

export default FormularioArticulo;
