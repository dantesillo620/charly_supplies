import { rutaProducto, textoPrecio } from '../catalog/catalog.data';
import { Producto } from '../catalog/catalog.models';
import { NEGOCIO } from './business.config';
import { urlAbsoluta } from './site.config';

/**
 * Enlaces de WhatsApp (wa.me). Abren el chat del negocio con un mensaje listo:
 * el cliente decide si lo envía y ahí se acuerdan disponibilidad y envío.
 * No registran compras, pedidos ni reservas.
 */

export const MENSAJE_GENERAL =
  'Hola, vi el catálogo de Charly Supplies y me gustaría recibir información sobre sus accesorios.';

/**
 * Mensaje de pedido: incluye nombre, referencia, precio y el enlace a la página
 * del producto. WhatsApp muestra la foto del producto como vista previa del enlace.
 */
export function mensajeProducto(producto: Producto): string {
  const { nombre, id } = producto;
  const enlace = urlAbsoluta(rutaProducto(producto));
  const pregunta =
    producto.precio != null
      ? `Hola, quiero pedir el ${nombre} (ref. ${id}) de ${textoPrecio(producto)}. ¿Me confirmas disponibilidad y costo de envío?`
      : `Hola, me interesa el ${nombre} (ref. ${id}). ¿Me compartes precio, disponibilidad y costo de envío?`;
  return `${pregunta}\n\nFoto del producto: ${enlace}`;
}

export function enlaceWhatsApp(mensaje: string = MENSAJE_GENERAL): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function enlaceWhatsAppProducto(producto: Producto): string {
  return enlaceWhatsApp(mensajeProducto(producto));
}

/** Enlace para la consulta general al negocio (encabezado, portada, contacto). */
export const WHATSAPP_GENERAL = enlaceWhatsApp();
