import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { Icon } from '../../shared/icon';
import { Producto } from '../catalog.models';
import { ProductDetail } from '../product-detail/product-detail';

/**
 * Detalle de producto en un <dialog> nativo con showModal(): el navegador
 * bloquea el fondo, atrapa el foco y cierra con Escape. Al cerrar, el foco
 * vuelve al botón que abrió el detalle (lo gestiona ProductGrid).
 */
@Component({
  selector: 'app-product-dialog',
  imports: [ProductDetail, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogo
      class="dialogo"
      aria-labelledby="detalle-titulo"
      (close)="cerrado.emit()"
      (click)="alClicFondo($event)"
    >
      @if (actual(); as p) {
        <div class="caja">
          <button type="button" class="cerrar" (click)="cerrar()" autofocus>
            <app-icon nombre="cerrar" />
            <span class="sr-only">Cerrar detalle</span>
          </button>
          <app-product-detail [producto]="p" tituloId="detalle-titulo" [enlacePagina]="true" />
        </div>
      }
    </dialog>
  `,
  styleUrl: './product-dialog.scss',
})
export class ProductDialog {
  readonly producto = input<Producto | null>(null);
  readonly cerrado = output<void>();

  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  /** Mantiene el último producto mientras corre la animación de cierre. */
  protected readonly actual = linkedSignal<Producto | null, Producto | null>({
    source: this.producto,
    computation: (p, previo) => p ?? previo?.value ?? null,
  });

  constructor() {
    // Después de renderizar el contenido, para que el foco inicial (autofocus) lo encuentre.
    afterRenderEffect(() => {
      const abierto = this.producto() !== null;
      const dialogo = this.dialogo().nativeElement;
      if (abierto && !dialogo.open) dialogo.showModal();
      else if (!abierto && dialogo.open) dialogo.close();
    });
  }

  protected cerrar(): void {
    this.dialogo().nativeElement.close();
  }

  /** Clic en el fondo (fuera de la caja) cierra el detalle. */
  protected alClicFondo(evento: MouseEvent): void {
    if (evento.target === this.dialogo().nativeElement) this.cerrar();
  }
}
