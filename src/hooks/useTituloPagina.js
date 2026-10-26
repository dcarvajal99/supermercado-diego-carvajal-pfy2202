// Cambia el título de la pestaña según la página. Al navegar sin recargar, el título es
// lo que confirma que la página cambió: aparece en la pestaña y en el historial, y lo
// lee un lector de pantalla.
import { useEffect } from 'react';

const SITIO = 'Despensa Austral';

export function useTituloPagina(titulo) {
    useEffect(() => {
        document.title = titulo + ' | ' + SITIO;
    }, [titulo]);
}
