import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTOS_VISIBLES } from './catalog/catalog.data';

export const serverRoutes: ServerRoute[] = [
  {
    // Se genera una página estática por producto (con su foto para compartir).
    path: 'catalogo/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRODUCTOS_VISIBLES.map((p) => ({ id: p.id })),
    fallback: PrerenderFallback.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
