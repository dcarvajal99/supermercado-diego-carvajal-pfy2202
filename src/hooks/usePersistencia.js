// Guarda el estado del inventario cada vez que cambia. La bandera `modificado` dice qué
// hacer: con cambios, se guarda; sin cambios (por ejemplo, después de restablecer), se
// borra lo guardado y la próxima visita parte de los datos de ejemplo.
import { useEffect } from 'react';
import { borrarEstado, guardarEstado } from '../contexto/persistencia.js';

export function usePersistencia(estado) {
    useEffect(() => {
        if (estado.modificado) guardarEstado(estado);
        else borrarEstado();
    }, [estado]);
}
