import { SITE } from '../site.config';

/** Quita propiedades vacías ('', [] o undefined) para no publicar datos incompletos. */
function compact(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== '' && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  );
}

/** JSON-LD de negocio local (schema.org/Store) para Google Search y Maps. */
export function buildBusinessSchema(): object {
  const { business } = SITE;
  const a = business.address;

  return compact({
    '@context': 'https://schema.org',
    '@type': business.type,
    name: SITE.name,
    url: SITE.url,
    image: SITE.url + SITE.defaultImage,
    description: SITE.defaultDescription,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    // Solo se publica la dirección si hay calle o ciudad, no únicamente el país.
    address:
      a.streetAddress || a.addressLocality
        ? { '@type': 'PostalAddress', ...compact({ ...a }) }
        : '',
    openingHours: [...business.openingHours],
    sameAs: [...business.sameAs],
  });
}
