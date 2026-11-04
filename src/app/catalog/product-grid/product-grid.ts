import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Producto } from '../catalog.models';
import { ProductCard } from '../product-card/product-card';
import { ProductDialog } from '../product-dialog/product-dialog';

/** Cuadrícula adaptable de tarjetas + detalle en modal. */
@Component({
  selector: 'app-product-grid',
  imports: [ProductCard, ProductDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="rejilla" [class.rejilla--ajustada]="ajustar()" role="list">
      @for (p of productos(); track p.id) {
        <li>
          <app-product-card [producto]="p" (verDetalle)="abrir(p, $event)" />
        </li>
      }
    </ul>
    <app-product-dialog [producto]="seleccionado()" (cerrado)="alCerrar()" />
  `,
  styles: `
    :host {
      display: block;
    }
    .rejilla {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 15.5rem), 1fr));
      gap: clamp(1rem, 2.5vw, 1.75rem);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    /* Pocas tarjetas (destacados): ocupan todo el ancho sin columnas vacías */
    .rejilla--ajustada {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15.5rem), 1fr));
    }
    @media (min-width: 1200px) {
      .rejilla--ajustada {
        grid-template-columns: repeat(auto-fit, minmax(17rem, 22rem));
      }
    }
    li > * {
      height: 100%;
    }
    /* Las tarjetas que entran al filtrar aparecen con un fundido breve */
    @media (prefers-reduced-motion: no-preference) {
      li {
        transition:
          opacity 220ms ease,
          transform 260ms var(--ease-out);
        @starting-style {
          opacity: 0;
          transform: translateY(0.5rem);
        }
      }
    }
  `,
})
export class ProductGrid {
  readonly productos = input.required<readonly Producto[]>();
  /** `true` para estirar pocas tarjetas en vez de dejar columnas vacías. */
  readonly ajustar = input(false);

  protected readonly seleccionado = signal<Producto | null>(null);
  private disparador: HTMLElement | null = null;

  protected abrir(producto: Producto, disparador: HTMLElement): void {
    this.disparador = disparador;
    this.seleccionado.set(producto);
  }

  protected alCerrar(): void {
    this.seleccionado.set(null);
    this.disparador?.focus();
    this.disparador = null;
  }
}
