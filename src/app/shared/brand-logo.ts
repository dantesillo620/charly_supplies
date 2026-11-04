import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LOGOS, LOGO_ALT, VarianteLogo, rutaLogo } from '../core/brand';

/**
 * Logo de marca con proporción natural (1340×924), srcset y object-fit: contain.
 * El tamaño lo define el contenedor (ancho del host).
 */
@Component({
  selector: 'app-brand-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="src()"
      [attr.srcset]="srcset()"
      [attr.sizes]="sizes()"
      width="1340"
      height="924"
      [alt]="alt()"
      [attr.loading]="prioritario() ? 'eager' : 'lazy'"
      [attr.fetchpriority]="prioritario() ? 'high' : null"
      decoding="async"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    img {
      width: 100%;
      height: auto;
      aspect-ratio: 1340 / 924;
      object-fit: contain;
    }
  `,
})
export class BrandLogo {
  readonly variante = input.required<VarianteLogo>();
  /** Valor de `sizes`, p. ej. "(min-width: 900px) 40vw, 80vw". */
  readonly sizes = input('100vw');
  /** Texto alternativo; usa "" si el logo es decorativo junto a otro igual. */
  readonly alt = input(LOGO_ALT);
  /** `true` para el logo visible al cargar (carga inmediata y prioridad alta). */
  readonly prioritario = input(false);

  private readonly logo = computed(() => LOGOS[this.variante()]);
  protected readonly src = computed(() => {
    const { archivo, anchos } = this.logo();
    return rutaLogo(archivo, anchos[Math.min(1, anchos.length - 1)]);
  });
  protected readonly srcset = computed(() => {
    const { archivo, anchos } = this.logo();
    return anchos.map((w) => `${rutaLogo(archivo, w)} ${w}w`).join(', ');
  });
}
