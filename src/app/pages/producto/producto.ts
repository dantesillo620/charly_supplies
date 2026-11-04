import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTOS_VISIBLES, nombreCategoria, productoPorId } from '../../catalog/catalog.data';
import { Producto } from '../../catalog/catalog.models';
import { ProductDetail } from '../../catalog/product-detail/product-detail';
import { ProductGrid } from '../../catalog/product-grid/product-grid';
import { urlAbsoluta } from '../../core/site.config';
import { SeoService } from '../../core/seo/seo.service';
import { Icon } from '../../shared/icon';

/** JSON-LD schema.org/Product para Google. */
function esquemaProducto(p: Producto): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    sku: p.id,
    ...(p.descripcion ? { description: p.descripcion } : {}),
    ...(p.imagenes.length
      ? { image: p.imagenes.map((i) => urlAbsoluta(i.compartir ?? i.src)) }
      : {}),
    ...(p.precio != null
      ? {
          offers: {
            '@type': 'Offer',
            price: p.precio,
            priceCurrency: 'MXN',
            url: urlAbsoluta(`/catalogo/${p.id}`),
          },
        }
      : {}),
  };
}

@Component({
  selector: 'app-producto',
  imports: [RouterLink, ProductDetail, ProductGrid, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="seccion superficie-clara pagina">
      <div class="contenedor">
        <nav class="migas" aria-label="Ruta de navegación">
          <ol>
            <li><a routerLink="/catalogo">Catálogo</a></li>
            @if (producto(); as p) {
              <li>
                <a routerLink="/catalogo" [queryParams]="{ categoria: p.categoria }">{{
                  categoria()
                }}</a>
              </li>
              <li aria-current="page">{{ p.nombre }}</li>
            }
          </ol>
        </nav>

        @if (producto(); as p) {
          <app-product-detail class="hoja" [producto]="p" nivel="h1" tituloId="producto-titulo" />
        } @else {
          <div class="no-encontrado">
            <h1 class="titulo-seccion">Producto no encontrado</h1>
            <p class="texto-grande">
              Puede que ya no esté disponible. Revisa el catálogo completo.
            </p>
            <a class="btn btn--rojo" routerLink="/catalogo">
              Ver catálogo <app-icon nombre="flecha" />
            </a>
          </div>
        }
      </div>
    </section>

    @if (relacionados().length) {
      <section class="seccion superficie-oscura" aria-labelledby="relacionados-titulo">
        <div class="contenedor">
          <h2 id="relacionados-titulo" class="titulo-seccion relacionados">
            Más {{ categoria().toLowerCase() }}
          </h2>
          <app-product-grid [productos]="relacionados()" [ajustar]="true" />
        </div>
      </section>
    }
  `,
  styles: `
    .pagina {
      padding-top: clamp(1.5rem, 4vw, 2.5rem);
    }
    .migas ol {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 0.5rem;
      margin: 0 0 1.5rem;
      padding: 0;
      list-style: none;
      font-size: 0.875rem;
      color: var(--texto-suave);
    }
    .migas li + li::before {
      content: '/';
      margin-right: 0.5rem;
    }
    .migas a {
      color: var(--texto);
      text-underline-offset: 0.2em;
    }
    .hoja {
      border-radius: var(--radio);
      background: var(--blanco);
      box-shadow: 0 0 0 1px rgb(21 18 17 / 0.1);
    }
    .no-encontrado {
      display: grid;
      justify-items: start;
      gap: 1.25rem;
      padding-block: 2rem;
    }
    .relacionados {
      margin-bottom: 2rem;
    }
  `,
})
export default class ProductoPagina implements OnDestroy {
  private readonly seo = inject(SeoService);

  /** Parámetro :id de la ruta (withComponentInputBinding). */
  readonly id = input<string>();

  protected readonly producto = computed(() => productoPorId(this.id()));
  protected readonly categoria = computed(() => {
    const p = this.producto();
    return p ? nombreCategoria(p.categoria) : '';
  });
  protected readonly relacionados = computed(() => {
    const p = this.producto();
    if (!p) return [];
    return PRODUCTOS_VISIBLES.filter((o) => o.categoria === p.categoria && o.id !== p.id).slice(
      0,
      4,
    );
  });

  constructor() {
    effect(() => {
      const p = this.producto();
      this.seo.setJsonLd('producto', p ? esquemaProducto(p) : null);
    });
  }

  ngOnDestroy(): void {
    this.seo.setJsonLd('producto', null);
  }
}
