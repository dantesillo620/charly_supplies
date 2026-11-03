/**
 * Datos globales del sitio. Todo el SEO (meta tags, Open Graph, canonical,
 * JSON-LD) toma sus valores de aquí, así que es el único lugar a editar
 * cuando cambie el dominio o los datos del negocio.
 */
export const SITE = {
  name: 'Charly Supplies',
  // TODO: reemplazar por el dominio definitivo (sin "/" al final).
  url: 'https://charly-supplies.vercel.app',
  locale: 'es_MX',
  // TODO: ajustar con la descripción real del negocio (120-160 caracteres).
  defaultDescription:
    'Charly Supplies: productos e insumos de calidad. Conoce nuestro catálogo y contáctanos para hacer tu pedido.',
  // Imagen para compartir en redes (1200x630). Colocar el archivo en /public.
  defaultImage: '/og-image.jpg',

  // Datos del negocio para Google (JSON-LD). Los campos vacíos se omiten.
  business: {
    // Tipo de schema.org. 'Store' es genérico; si aplica, usar uno más
    // específico (p. ej. 'HardwareStore', 'OfficeEquipmentStore', 'HomeGoodsStore').
    type: 'Store',
    telephone: '', // TODO: '+52 ...'
    email: '', // TODO
    priceRange: '$$',
    address: {
      streetAddress: '', // TODO
      addressLocality: '', // TODO: ciudad
      addressRegion: '', // TODO: estado
      postalCode: '', // TODO
      addressCountry: 'MX',
    },
    openingHours: [] as string[], // TODO: p. ej. ['Mo-Fr 09:00-18:00', 'Sa 09:00-14:00']
    sameAs: [] as string[], // TODO: URLs de Instagram, Facebook, TikTok...
  },
} as const;
