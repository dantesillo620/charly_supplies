/**
 * Variantes del logo. Los originales están en public/brand/ y no se modifican;
 * el sitio usa copias WebP de public/brand/web/ recortadas únicamente en el
 * margen vacío (mismo contenido y colores), todas de 1340×924 px.
 *
 * `superficie` indica el fondo propio de cada archivo: cada variante se coloca
 * sobre ese mismo color para que se integre sin "cajas" visibles.
 */
export type VarianteLogo =
  'oficial' | 'transparente' | 'blancoNegro' | 'rojoBlanco' | 'negroBlanco';

export interface LogoMarca {
  archivo: string;
  anchos: readonly number[];
  superficie: 'negro' | 'blanco' | 'transparente';
}

export const LOGO_ANCHO = 1340;
export const LOGO_ALTO = 924;
export const LOGO_ALT = 'Charly Supplies, Smoke Shop';

export const LOGOS: Record<VarianteLogo, LogoMarca> = {
  // LOGO OFICIAL.png
  oficial: { archivo: 'logo-oficial', anchos: [240, 480, 720], superficie: 'negro' },
  // Charly Supplies con fondo transparente-2.png
  transparente: {
    archivo: 'logo-transparente',
    anchos: [640, 960, 1340],
    superficie: 'transparente',
  },
  // Logo SMOKE charly_supplies en blanco y negro-4.png
  blancoNegro: { archivo: 'logo-blanco-negro', anchos: [400, 800], superficie: 'negro' },
  // Logo SMOKE charly_supplies SHOP sobre blanco-5.png
  rojoBlanco: { archivo: 'logo-rojo-blanco', anchos: [560, 1120], superficie: 'blanco' },
  // Logo SMOKE monocromático sobre fondo blanco-3.png
  negroBlanco: { archivo: 'logo-negro-blanco', anchos: [480, 960], superficie: 'blanco' },
};

export function rutaLogo(archivo: string, ancho: number): string {
  return `/brand/web/${archivo}-${ancho}.webp`;
}
