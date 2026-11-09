// Botón del sitio con variantes: las clases de Tailwind viven en un solo lugar y cada uso
// elige la variante y el tamaño. Con `ruta` se dibuja un Link de React Router con el
// mismo aspecto, para los enlaces que se ven como botón.
import { Link } from 'react-router';

const BASE = 'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md border font-medium aria-disabled:cursor-not-allowed aria-disabled:opacity-40';

const VARIANTES = {
    principal: 'border-tinta bg-tinta text-blanco not-aria-disabled:hover:border-suave not-aria-disabled:hover:bg-suave',
    secundario: 'border-tinta bg-blanco text-tinta not-aria-disabled:hover:bg-lienzo',
};

const TAMANOS = {
    normal: 'px-4 py-2 text-sm',
    chico: 'px-2.5 py-1 text-sm',
    icono: 'size-8 text-sm',
};

function Boton({ variante = 'secundario', tamano = 'normal', ruta, className = '', type = 'button', ...propiedades }) {
    const clases = [BASE, VARIANTES[variante], TAMANOS[tamano], className].join(' ');
    if (ruta) return <Link to={ruta} className={clases} {...propiedades} />;
    return <button type={type} className={clases} {...propiedades} />;
}

export default Boton;
