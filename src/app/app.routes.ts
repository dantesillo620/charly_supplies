import { Routes } from '@angular/router';
import { SeoData } from './core/seo/seo.service';
import { seoProducto, tituloProducto } from './pages/producto/producto.seo';
import { PRECIO_ENCENDEDORES } from './catalog/catalog.data';

const promo =
  PRECIO_ENCENDEDORES.promocion != null
    ? ` Encendedores en promoción a $${PRECIO_ENCENDEDORES.promocion}.`
    : '';

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
        description: `Charly Supplies: encendedores y accesorios con estilo urbano.${promo} Pide por WhatsApp y acordamos el envío.`,
      } satisfies SeoData,
    },
  },
  {
    path: 'catalogo',
    title: 'Catálogo',
    loadComponent: () => import('./pages/catalogo/catalogo'),
    data: {
      seo: {
        description: `Catálogo de Charly Supplies: encendedores y accesorios.${promo} Busca por diseño y pide por WhatsApp.`,
      } satisfies SeoData,
    },
  },
  {
    // Página de cada producto: es el enlace que va en el mensaje de WhatsApp.
    path: 'catalogo/:id',
    title: tituloProducto,
    loadComponent: () => import('./pages/producto/producto'),
    resolve: { seo: seoProducto },
  },
  {
    path: 'contacto',
    title: 'Contacto',
    loadComponent: () => import('./pages/contacto/contacto'),
    data: {
      seo: {
        description:
          'Contacta a Charly Supplies por WhatsApp para pedir productos y acordar el envío. Atención de lunes a domingo, de 9:00 a. m. a 9:00 p. m.',
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
