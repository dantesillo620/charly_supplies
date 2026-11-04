import { ResolveFn } from '@angular/router';
import {
  enPromocion,
  formatearPrecio,
  productoPorId,
  textoPrecio,
} from '../../catalog/catalog.data';
import { SeoData } from '../../core/seo/seo.service';

/** Título de la pestaña: nombre del producto. */
export const tituloProducto: ResolveFn<string> = (route) =>
  productoPorId(route.paramMap.get('id'))?.nombre ?? 'Producto no encontrado';

/**
 * Descripción e imagen para Google y para la vista previa de WhatsApp/Facebook:
 * al compartir /catalogo/<id> se muestra la foto del producto.
 */
export const seoProducto: ResolveFn<SeoData> = (route) => {
  const p = productoPorId(route.paramMap.get('id'));
  if (!p) return { noindex: true };

  const img = p.imagenes[0];
  const precio =
    p.precio == null
      ? ''
      : enPromocion(p)
        ? ` a ${textoPrecio(p)} (antes ${formatearPrecio(p.precioAntes!)})`
        : ` a ${textoPrecio(p)}`;

  return {
    description:
      `${p.nombre}${precio}. ${p.descripcion ?? ''} Pídelo por WhatsApp a Charly Supplies.`
        .replace(/\s+/g, ' ')
        .trim(),
    image: img ? (img.compartir ?? img.src) : undefined,
    imageWidth: img?.compartir ? 800 : img?.ancho,
    imageHeight: img?.compartir ? 800 : img?.alto,
    imageAlt: img?.alt,
    type: 'product',
  };
};
