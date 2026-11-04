/** Navegación principal (encabezado, menú móvil y pie de página). */
export interface EnlaceNav {
  ruta: string;
  etiqueta: string;
  exacto: boolean;
}

export const NAVEGACION: readonly EnlaceNav[] = [
  { ruta: '/', etiqueta: 'Inicio', exacto: true },
  { ruta: '/catalogo', etiqueta: 'Catálogo', exacto: false },
  { ruta: '/contacto', etiqueta: 'Contacto', exacto: false },
];
