import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { enPromocion, formatearPrecio, textoPrecio } from '../catalog.data';
import { Producto } from '../catalog.models';

/** Precio del producto; con promoción muestra el precio anterior tachado. */
@Component({
  selector: 'app-product-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.grande]': 'grande()' },
  template: `
    @if (promo()) {
      <span class="etiqueta">Promoción</span>
      <span class="actual"><span class="sr-only">Precio de promoción: </span>{{ actual() }}</span>
      <del class="antes"><span class="sr-only">Precio normal: </span>{{ antes() }}</del>
    } @else {
      <span class="actual">{{ actual() }}</span>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.25rem 0.6rem;
    }
    .actual {
      font-weight: 700;
      font-size: 1.125rem;
    }
    .antes {
      color: var(--tinta-suave);
      font-size: 0.9375rem;
      text-decoration-thickness: 2px;
      text-decoration-color: var(--rojo);
    }
    .etiqueta {
      align-self: center;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      background: var(--rojo);
      color: var(--blanco);
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    :host(.grande) .actual {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: 2.75rem;
      line-height: 1;
    }
    :host(.grande) .antes {
      font-size: 1.125rem;
    }
  `,
})
export class ProductPrice {
  readonly producto = input.required<Producto>();
  readonly grande = input(false);

  protected readonly promo = computed(() => enPromocion(this.producto()));
  protected readonly actual = computed(() => textoPrecio(this.producto()));
  protected readonly antes = computed(() => formatearPrecio(this.producto().precioAntes ?? 0));
}
