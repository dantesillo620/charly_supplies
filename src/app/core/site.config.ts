import { NEGOCIO } from './business.config';

/**
 * Datos globales del sitio para SEO (meta tags, Open Graph, canonical,
 * JSON-LD). Los datos de contacto se editan en business.config.ts.
 */
export const SITE = {
  name: NEGOCIO.nombre,
  // TODO: reemplazar por el dominio definitivo (sin "/" al final).
  url: 'https://charly-supplies.vercel.app',
  locale: 'es_MX',
  defaultDescription:
    'Charly Supplies: encendedores, pipas y accesorios con estilo urbano. Explora el catálogo y consulta precio y disponibilidad por WhatsApp.',
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
    sameAs: NEGOCIO.instagram ? [NEGOCIO.instagram.url] : [],
  },
} as const;
