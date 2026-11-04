import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CategoriaId, ImagenProducto } from '../catalog.models';
import { Icon } from '../../shared/icon';

/**
 * Imagen de producto con proporción fija. Si no hay foto, muestra un marcador
 * gráfico neutro (icono de línea de la categoría), nunca una foto simulada.
 * Al agregar fotos reales no hay que cambiar nada aquí.
 */
@Component({
  selector: 'app-product-media',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (imagen(); as img) {
      <img
        [src]="img.src"
        [attr.srcset]="img.srcset ?? null"
        [alt]="img.alt"
        [attr.width]="img.ancho ?? 1200"
        [attr.height]="img.alto ?? 1200"
        [attr.loading]="prioritaria() ? 'eager' : 'lazy'"
        [attr.sizes]="sizes()"
        decoding="async"
      />
    } @else {
      <div class="marcador" role="img" [attr.aria-label]="etiquetaMarcador()">
        <app-icon class="marcador__icono" [nombre]="categoria()" />
        <app-icon class="marcador__destello" nombre="destello" />
        <span class="marcador__texto" aria-hidden="true">Foto próximamente</span>
      </div>
    }
  `,
  styleUrl: './product-media.scss',
})
export class ProductMedia {
  readonly imagen = input<ImagenProducto | undefined>();
  readonly categoria = input.required<CategoriaId>();
  readonly etiquetaMarcador = input('Fotografía pendiente');
  readonly prioritaria = input(false);
  readonly sizes = input('(min-width: 1200px) 300px, (min-width: 640px) 45vw, 92vw');
}
