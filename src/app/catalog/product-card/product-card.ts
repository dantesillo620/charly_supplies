import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { enlaceWhatsAppProducto } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { nombreCategoria } from '../catalog.data';
import { Producto } from '../catalog.models';
import { ProductMedia } from '../product-media/product-media';
import { ProductPrice } from '../product-price/product-price';

@Component({
  selector: 'app-product-card',
  imports: [ProductMedia, ProductPrice, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly producto = input.required<Producto>();
  /** Emite el botón que abrió el detalle (para devolverle el foco al cerrar). */
  readonly verDetalle = output<HTMLElement>();

  protected readonly categoria = computed(() => nombreCategoria(this.producto().categoria));
  protected readonly whatsapp = computed(() => enlaceWhatsAppProducto(this.producto()));
}
