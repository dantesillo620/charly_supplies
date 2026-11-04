import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NEGOCIO } from '../../core/business.config';
import { WHATSAPP_GENERAL, enlaceWhatsAppProducto } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { nombreCategoria, rutaProducto } from '../catalog.data';
import { Producto } from '../catalog.models';
import { ProductMedia } from '../product-media/product-media';
import { ProductPrice } from '../product-price/product-price';

/** Galería + información + pedido por WhatsApp. Se usa en el modal y en la página del producto. */
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductMedia, ProductPrice, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  readonly producto = input.required<Producto>();
  /** 'h1' en la página del producto; 'h2' dentro del modal. */
  readonly nivel = input<'h1' | 'h2'>('h2');
  readonly tituloId = input('detalle-titulo');
  /** Muestra el enlace a la página del producto (útil desde el modal). */
  readonly enlacePagina = input(false);

  /** Foto visible; vuelve a la primera al cambiar de producto. */
  protected readonly indice = linkedSignal({ source: this.producto, computation: () => 0 });

  protected readonly imagenes = computed(() => this.producto().imagenes);
  protected readonly imagenActual = computed(() => this.imagenes()[this.indice()]);
  protected readonly categoria = computed(() => nombreCategoria(this.producto().categoria));
  protected readonly ruta = computed(() => rutaProducto(this.producto()));
  protected readonly whatsapp = computed(() => enlaceWhatsAppProducto(this.producto()));
  protected readonly whatsappGeneral = WHATSAPP_GENERAL;
  protected readonly envio = NEGOCIO.envio;

  protected mover(paso: number): void {
    const total = this.imagenes().length;
    if (total > 1) this.indice.update((i) => (i + paso + total) % total);
  }
}
