import { Routes } from '@angular/router';
import { SeoData } from './core/seo/seo.service';

/**
 * Cada ruta define `title` y `data.seo`; SeoTitleStrategy los convierte en
 * <title>, description, canonical, Open Graph y Twitter Card.
 * Al agregar una ruta pública, agrégala también a public/sitemap.xml.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home'),
    data: {
      seo: {
        description:
          'Charly Supplies: encendedores, pipas y accesorios con estilo urbano. Explora el catálogo y consulta precio y disponibilidad por WhatsApp.',
      } satisfies SeoData,
    },
  },
  {
    path: 'catalogo',
    title: 'Catálogo',
    loadComponent: () => import('./pages/catalogo/catalogo'),
    data: {
      seo: {
        description:
          'Catálogo de Charly Supplies: encendedores, pipas y otros accesorios. Busca por nombre, filtra por categoría y consulta por WhatsApp.',
      } satisfies SeoData,
    },
  },
  {
    path: 'contacto',
    title: 'Contacto',
    loadComponent: () => import('./pages/contacto/contacto'),
    data: {
      seo: {
        description:
          'Contacta a Charly Supplies por WhatsApp para consultar productos, precios y disponibilidad. Horario de atención de lunes a viernes.',
      } satisfies SeoData,
    },
  },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./pages/not-found/not-found'),
    data: { seo: { noindex: true } satisfies SeoData },
  },
];
