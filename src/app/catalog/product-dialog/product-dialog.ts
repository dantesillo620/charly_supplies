import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { WHATSAPP_GENERAL, enlaceWhatsApp, mensajeProducto } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { nombreCategoria, textoPrecio } from '../catalog.data';
import { Producto } from '../catalog.models';
import { ProductMedia } from '../product-media/product-media';

/**
 * Detalle de producto en un <dialog> nativo con showModal(): el navegador
 * bloquea el fondo, atrapa el foco y cierra con Escape. Al cerrar, el foco
 * vuelve al botón que abrió el detalle (lo gestiona ProductGrid).
 */
@Component({
  selector: 'app-product-dialog',
  imports: [ProductMedia, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-dialog.html',
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
  /** Foto visible; vuelve a la primera al cambiar de producto. */
  protected readonly indice = linkedSignal({ source: this.producto, computation: () => 0 });

  protected readonly imagenes = computed(() => this.actual()?.imagenes ?? []);
  protected readonly imagenActual = computed(() => this.imagenes()[this.indice()]);
  protected readonly categoria = computed(() => {
    const p = this.actual();
    return p ? nombreCategoria(p.categoria) : '';
  });
  protected readonly precio = computed(() => {
    const p = this.actual();
    return p ? textoPrecio(p) : '';
  });
  protected readonly whatsappProducto = computed(() => {
    const p = this.actual();
    return p ? enlaceWhatsApp(mensajeProducto(p.nombre, p.id)) : WHATSAPP_GENERAL;
  });
  protected readonly whatsappGeneral = WHATSAPP_GENERAL;

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

  protected mover(paso: number): void {
    const total = this.imagenes().length;
    if (total > 1) this.indice.update((i) => (i + paso + total) % total);
  }
}
