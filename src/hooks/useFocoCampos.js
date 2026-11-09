// Foco de un formulario mediante referencias: cada campo se registra con su nombre y el
// formulario lo enfoca por ese mismo nombre, sin buscarlo en el documento por su id.
//   const { registrar, enfocar } = useFocoCampos();
//   <input ref={registrar('nombre')} />   ...   enfocar('nombre');
import { useCallback, useRef } from 'react';

export function useFocoCampos() {
    const campos = useRef({}); // { nombre: elemento }
    const callbacks = useRef({}); // Una ref por nombre, la misma en cada render

    // Ref de callback: React la llama con el elemento al montarlo y con null al quitarlo.
    const registrar = useCallback((nombre) => {
        callbacks.current[nombre] ??= (elemento) => {
            if (elemento) campos.current[nombre] = elemento;
            else delete campos.current[nombre];
        };
        return callbacks.current[nombre];
    }, []);

    const enfocar = useCallback((nombre) => campos.current[nombre]?.focus(), []);

    return { registrar, enfocar };
}
