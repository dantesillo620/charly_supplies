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
          'Charly Supplies: productos e insumos de calidad. Conoce nuestro catálogo y haz tu pedido.',
      } satisfies SeoData,
    },
  },
  {
    path: 'productos',
    title: 'Productos',
    loadComponent: () => import('./pages/productos/productos'),
    data: {
      seo: {
        description: 'Catálogo de productos de Charly Supplies.',
      } satisfies SeoData,
    },
  },
  {
    path: 'contacto',
    title: 'Contacto',
    loadComponent: () => import('./pages/contacto/contacto'),
    data: {
      seo: {
        description: 'Contacta a Charly Supplies para cotizaciones y pedidos.',
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
