// Clases de Tailwind que se repiten en varios componentes. Reunirlas aquí mantiene igual
// cada botón, campo y panel del sitio, y cambiarlos es editar una sola línea.
const BOTON = 'inline-flex cursor-pointer items-center justify-center rounded-md border font-medium aria-disabled:cursor-not-allowed aria-disabled:opacity-40';
const RELLENO = 'border-tinta bg-tinta text-blanco hover:border-suave hover:bg-suave';
const CONTORNO = 'border-tinta bg-blanco text-tinta hover:bg-lienzo';

export const BOTON_PRINCIPAL = BOTON + ' ' + RELLENO + ' px-4 py-2 text-sm';
export const BOTON_SECUNDARIO = BOTON + ' ' + CONTORNO + ' px-4 py-2 text-sm';
export const BOTON_CHICO = BOTON + ' ' + CONTORNO + ' px-2.5 py-1 text-sm';
export const BOTON_CHICO_ACTIVO = BOTON + ' ' + RELLENO + ' px-2.5 py-1 text-sm';
export const BOTON_ICONO = BOTON + ' ' + CONTORNO + ' size-8 text-sm';

export const CONTENEDOR = 'mx-auto w-full max-w-6xl px-4 sm:px-6';
export const PANEL = 'rounded-lg border border-borde bg-blanco p-5';
export const ENLACE = 'text-acento underline hover:text-tinta';
export const ENLACE_SIMPLE = 'text-acento hover:text-tinta hover:underline';

export const TITULO_PAGINA = 'text-3xl font-semibold';
export const SUBTITULO = 'text-xl font-semibold';
export const INTRODUCCION = 'mt-1.5 text-suave';

export const ETIQUETA = 'mb-1 block text-sm font-medium';
export const CAMPO = 'block h-11 w-full rounded-md border border-borde bg-blanco px-3 text-base text-tinta placeholder:text-suave focus:border-acento aria-[invalid=true]:border-alerta';
export const ERROR = 'mt-1 text-sm text-alerta';
