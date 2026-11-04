import { NEGOCIO } from './business.config';

/**
 * Datos globales del sitio para SEO (meta tags, Open Graph, canonical,
 * JSON-LD). Los datos de contacto se editan en business.config.ts.
 */
export const SITE = {
  name: NEGOCIO.nombre,
  /**
   * Dominio de respaldo (sin "/" al final). Normalmente NO se usa: en Vercel el
   * dominio se toma automáticamente al compilar, y en el navegador se usa el
   * dominio actual (ver urlSitio()). Cámbialo al dominio definitivo cuando el
   * sitio se compile fuera de Vercel (p. ej. para subirlo a Hostinger).
   */
  url: 'https://charly-supplies.vercel.app',
  locale: 'es_MX',
  defaultDescription:
    'Charly Supplies: encendedores y accesorios con estilo urbano. Explora el catálogo y pide por WhatsApp; el envío se acuerda en el chat.',
  // Imagen para compartir en redes (1200x630), generada a partir de LOGO OFICIAL.
  defaultImage: '/og-image.jpg',

  // Datos del negocio para Google (JSON-LD). Los campos vacíos se omiten.
  business: {
    type: 'Store',
    telephone: NEGOCIO.telefono.enlace,
    email: '',
    // Se omite a propósito: no hay rango de precios confirmado.
    priceRange: '',
    address: {
      streetAddress: NEGOCIO.direccion?.calle ?? '',
      addressLocality: NEGOCIO.direccion?.ciudad ?? '',
      addressRegion: NEGOCIO.direccion?.estado ?? '',
      postalCode: NEGOCIO.direccion?.codigoPostal ?? '',
      addressCountry: 'MX',
    },
    openingHours: [...NEGOCIO.horarioSchema],
    sameAs: [NEGOCIO.instagram?.url, NEGOCIO.facebook?.url].filter((u): u is string => !!u),
  },
} as const;

/**
 * URL base del sitio (sin "/" final):
 * - En el navegador: el dominio desde el que se visita (Vercel hoy, Hostinger mañana).
 * - Al prerenderizar en Vercel: su dominio de producción (VERCEL_PROJECT_PRODUCTION_URL).
 * - En otro caso: SITE.url.
 */
export function urlSitio(): string {
  if (typeof window !== 'undefined' && window.location.origin.startsWith('http')) {
    return window.location.origin;
  }
  // Solo existe al compilar/prerenderizar en Node; en el navegador queda undefined.
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env;
  const vercel = env?.['VERCEL_PROJECT_PRODUCTION_URL'];
  return vercel ? `https://${vercel}` : SITE.url;
}

/** Convierte una ruta del sitio ("/catalogo") en URL absoluta. */
export function urlAbsoluta(ruta: string): string {
  if (/^https?:\/\//.test(ruta)) return ruta;
  const limpia = ruta.split(/[?#]/)[0];
  return urlSitio() + (limpia.startsWith('/') ? limpia : `/${limpia}`);
}
