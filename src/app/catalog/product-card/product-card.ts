import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { mensajeProducto, enlaceWhatsApp } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { nombreCategoria, textoPrecio } from '../catalog.data';
import { Producto } from '../catalog.models';
import { ProductMedia } from '../product-media/product-media';

@Component({
  selector: 'app-product-card',
  imports: [ProductMedia, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly producto = input.required<Producto>();
  /** Emite el botón que abrió el detalle (para devolverle el foco al cerrar). */
  readonly verDetalle = output<HTMLElement>();

  protected readonly categoria = computed(() => nombreCategoria(this.producto().categoria));
  protected readonly precio = computed(() => textoPrecio(this.producto()));
  protected readonly whatsapp = computed(() => {
    const p = this.producto();
    return enlaceWhatsApp(mensajeProducto(p.nombre, p.id));
  });
}
