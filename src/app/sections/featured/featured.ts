import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HAY_EJEMPLOS, PRODUCTOS_DESTACADOS } from '../../catalog/catalog.data';
import { ProductGrid } from '../../catalog/product-grid/product-grid';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

/** Productos con `destacado: true`. Si no hay ninguno, la sección no se muestra. */
@Component({
  selector: 'app-featured',
  imports: [RouterLink, ProductGrid, Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (productos.length) {
      <section class="seccion superficie-oscura" aria-labelledby="destacados-titulo">
        <div class="contenedor">
          <header class="cabecera" appReveal>
            <div>
              <p class="antetitulo antetitulo--rojo"><app-icon nombre="destello" /> Destacados</p>
              <h2 id="destacados-titulo" class="titulo-seccion">Del catálogo</h2>
            </div>
            <a class="btn btn--contorno" routerLink="/catalogo">
              Ver catálogo completo <app-icon nombre="flecha" />
            </a>
          </header>
          @if (hayEjemplos) {
            <p class="aviso">
              <span class="etiqueta-ejemplo">Demostración</span>
              Estas fichas son de ejemplo mientras preparamos las fotos de los productos.
            </p>
          }
          <app-product-grid appReveal [productos]="productos" [ajustar]="true" />
        </div>
      </section>
    }
  `,
  styles: `
    .cabecera {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1.5rem 2rem;
      margin-bottom: 1.75rem;
    }
    .titulo-seccion {
      margin-top: 1rem;
    }
    .aviso {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 0.75rem;
      margin-bottom: 1.75rem;
      font-size: 0.875rem;
      color: var(--texto-suave);
    }
  `,
})
export class Featured {
  protected readonly productos = PRODUCTOS_DESTACADOS;
  protected readonly hayEjemplos = HAY_EJEMPLOS;
}
